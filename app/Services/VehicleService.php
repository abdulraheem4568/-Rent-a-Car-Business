<?php
namespace App\Services;

use App\Models\Vehicle;

class VehicleService
{
    public function all()
    {
        return Vehicle::orderBy('created_at','desc')->get();
    }

    public function create(array $data)
    {
        return Vehicle::create($data);
    }

    public function update(Vehicle $vehicle, array $data)
    {
        $vehicle->update($data);
        return $vehicle;
    }

    public function delete(Vehicle $vehicle)
    {
        $vehicle->delete();
    }
}