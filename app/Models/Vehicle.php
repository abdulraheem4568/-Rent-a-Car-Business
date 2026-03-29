<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['name','type','seats','price_per_day','available'];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
