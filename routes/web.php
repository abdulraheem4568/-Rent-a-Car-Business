<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleBookingController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->group(function() {


    // Customers
    Route::get('/customers',[VehicleBookingController::class,'customers'])->name('customers.index');
    Route::post('/customers',[VehicleBookingController::class,'storeCustomer'])->name('customers.store');
    Route::delete('/customers/{customer}',[VehicleBookingController::class,'deleteCustomer'])->name('customers.delete');

    // Vehicles
    Route::get('/vehicles',[VehicleBookingController::class,'vehicles'])->name('vehicles.index');
    Route::post('/vehicles',[VehicleBookingController::class,'storeVehicle'])->name('vehicles.store');
    Route::delete('/vehicles/{vehicle}',[VehicleBookingController::class,'deleteVehicle'])->name('vehicles.delete');

    // Bookings
    Route::get('/bookings',[VehicleBookingController::class,'bookings'])->name('bookings.index');
    Route::post('/bookings',[VehicleBookingController::class,'storeBooking'])->name('bookings.store');
    Route::delete('/bookings/{booking}',[VehicleBookingController::class,'deleteBooking'])->name('bookings.delete');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
