<?php

namespace App\Services;

use App\Models\Vehicle;
use Illuminate\Support\Facades\DB;

class VehicleService
{
    /**
     * Get all vehicles
     */
    public function all()
    {
        return Vehicle::orderBy('created_at', 'desc')->get();
    }

    /**
     * Create new vehicle
     */
    public function create(array $data)
    {
        return Vehicle::create([
            'name'          => $data['name'],
            'type'          => $data['type'],
            'seats'         => $data['seats'],
            'price_per_day' => $data['price_per_day'],
            'available'     => $data['available'] ?? true,
        ]);
    }

    /**
     * Update vehicle
     */
    public function update(Vehicle $vehicle, array $data)
    {
        $vehicle->update([
            'name'          => $data['name'],
            'type'          => $data['type'],
            'seats'         => $data['seats'],
            'price_per_day' => $data['price_per_day'],
            'available'     => $data['available'] ?? $vehicle->available,
        ]);

        return $vehicle->fresh();
    }

    /**
     * Toggle vehicle availability (Quick Switch)
     */
    public function toggleAvailability(Vehicle $vehicle)
    {
        $vehicle->update([
            'available' => !$vehicle->available
        ]);

        return $vehicle->fresh();
    }

    /**
     * Delete vehicle
     */
    public function delete(Vehicle $vehicle)
    {
        // Optional: Agar booking mein vehicle linked hai to safety check laga sakte hain
        // $hasActiveBookings = $vehicle->bookings()->where('status', '!=', 'completed')->exists();
        
        $vehicle->delete();
        return true;
    }
}