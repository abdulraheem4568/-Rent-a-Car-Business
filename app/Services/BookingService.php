<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Vehicle;
use Illuminate\Support\Facades\DB;

class BookingService
{
    /**
     * Get all bookings with relationships
     */
    public function all()
    {
        return Booking::with(['customer', 'vehicle'])
                      ->orderBy('created_at', 'desc')
                      ->get();
    }

    /**
     * Create a new booking
     */
    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {
            $vehicle = Vehicle::findOrFail($data['vehicle_id']);

            if (!$vehicle->available) {
                throw new \Exception("Selected vehicle is not available for booking.");
            }

            // Calculate total price (number of days * price per day)
            $startDate = strtotime($data['start_date']);
            $endDate   = strtotime($data['end_date']);
            $days      = max(1, ($endDate - $startDate) / 86400); // minimum 1 day

            $data['total_price'] = $vehicle->price_per_day * $days;
            $data['status']      = $data['status'] ?? 'confirmed';

            $booking = Booking::create($data);

            // Mark vehicle as unavailable
            $vehicle->update(['available' => false]);

            return $booking;
        });
    }

    /**
     * Update an existing booking
     */
    public function update(Booking $booking, array $data)
    {
        return DB::transaction(function () use ($booking, $data) {
            $oldVehicleId = $booking->vehicle_id;
            $newVehicleId = $data['vehicle_id'] ?? $oldVehicleId;

            // If vehicle is being changed
            if ($newVehicleId != $oldVehicleId) {
                $newVehicle = Vehicle::findOrFail($newVehicleId);

                if (!$newVehicle->available) {
                    throw new \Exception("Selected vehicle is not available for booking.");
                }

                // Free up the old vehicle
                Vehicle::where('id', $oldVehicleId)->update(['available' => true]);

                // Mark new vehicle as unavailable
                $newVehicle->update(['available' => false]);
            }

            // Recalculate total price if dates or vehicle changed
            if (isset($data['start_date']) || isset($data['end_date']) || $newVehicleId != $oldVehicleId) {
                $vehicle = Vehicle::findOrFail($newVehicleId);

                $startDate = strtotime($data['start_date'] ?? $booking->start_date);
                $endDate   = strtotime($data['end_date'] ?? $booking->end_date);
                $days      = max(1, ($endDate - $startDate) / 86400);

                $data['total_price'] = $vehicle->price_per_day * $days;
            }

            // Update the booking
            $booking->update($data);

            return $booking->fresh(['customer', 'vehicle']);
        });
    }

    /**
     * Delete a booking and free up the vehicle
     */
    public function delete(Booking $booking)
    {
        return DB::transaction(function () use ($booking) {
            // Mark vehicle as available again
            $booking->vehicle->update(['available' => true]);

            // Delete the booking
            $booking->delete();

            return true;
        });
    }
}