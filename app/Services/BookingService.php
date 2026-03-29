<?php
namespace App\Services;

use App\Models\Booking;
use App\Models\Vehicle;

class BookingService
{
    public function all()
    {
        return Booking::with(['customer','vehicle'])->orderBy('created_at','desc')->get();
    }

    public function create(array $data)
    {
        $vehicle = Vehicle::findOrFail($data['vehicle_id']);
        if(!$vehicle->available){
            throw new \Exception("Vehicle not available");
        }

        $data['total_price'] = $vehicle->price_per_day * (strtotime($data['end_date']) - strtotime($data['start_date']))/86400;
        $booking = Booking::create($data);

        $vehicle->update(['available' => false]);

        return $booking;
    }

    public function delete(Booking $booking)
    {
        $booking->vehicle->update(['available' => true]);
        $booking->delete();
    }
}