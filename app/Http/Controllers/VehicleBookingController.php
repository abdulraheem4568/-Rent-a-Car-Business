<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Customer;
use App\Models\Vehicle;
use App\Models\Booking;
use Illuminate\Http\RedirectResponse;
use App\Services\CustomerService;
use App\Services\VehicleService;
use App\Services\BookingService;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\StoreBookingRequest;

class VehicleBookingController extends Controller
{
    public function __construct(
        protected CustomerService $customerService,
        protected VehicleService $vehicleService,
        protected BookingService $bookingService
    ) {}

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */
    // public function dashboard(): Response
    // {
    //     return Inertia::render('Dashboard/Index', [
    //         'stats' => [
    //             'totalRevenue'  => Booking::sum('total_price'),
    //             'totalBookings' => Booking::count(),
    //             'totalCustomers'=> Customer::count(),
    //             'totalVehicles' => Vehicle::count(),
    //         ]
    //     ]);
    // }

    /*
    |--------------------------------------------------------------------------
    | Customers
    |--------------------------------------------------------------------------
    */
    public function customers(): Response
    {
        return Inertia::render('Customers/Index', [
            'customers' => $this->customerService->all()
        ]);
    }

    public function storeCustomer(StoreCustomerRequest $request)
{
    $customer = $this->customerService->create($request->validated());

     return Inertia::render('Customers/Index', [
        'customers' => $this->customerService->all(),
        'flash' => ['success' => 'Customer created successfully']
    ]);
}

    public function deleteCustomer(Customer $customer): RedirectResponse
    {
        $this->customerService->delete($customer);

        return back()->with('success', 'Customer deleted successfully.');
    }

    /*
    |--------------------------------------------------------------------------
    | Vehicles
    |--------------------------------------------------------------------------
    */
    public function vehicles(): Response
    {
        return Inertia::render('Vehicles/Index', [
            'vehicles' => $this->vehicleService->all()
        ]);
    }

   /**
 * Store New Vehicle
 */
public function storeVehicle(StoreVehicleRequest $request)
{
    $this->vehicleService->create($request->validated());

    return redirect()->route('vehicles.index')
        ->with('success', 'Vehicle created successfully.');
}

/**
 * Update Vehicle
 */
public function updateVehicle(StoreVehicleRequest $request, Vehicle $vehicle)
{
    $this->vehicleService->update($vehicle, $request->validated());

    return redirect()->route('vehicles.index')
        ->with('success', 'Vehicle updated successfully.');
}

/**
 * Toggle Vehicle Availability (for Switch)
 */
public function toggleAvailability(Vehicle $vehicle)
{
    $this->vehicleService->toggleAvailability($vehicle);

    return redirect()->route('vehicles.index')
        ->with('success', 'Vehicle availability updated.');
}

/**
 * Delete Vehicle
 */
public function deleteVehicle(Vehicle $vehicle)
{
    $this->vehicleService->delete($vehicle);

    return redirect()->route('vehicles.index')
        ->with('success', 'Vehicle deleted successfully.');
}
    /*
    |--------------------------------------------------------------------------
    | Bookings
    |--------------------------------------------------------------------------
    */
    public function bookings(): Response
    {
        return Inertia::render('Bookings/Index', [
            'bookings'  => $this->bookingService->all(),
            'customers' => Customer::select('id', 'name')->get(),
            'vehicles'  => Vehicle::select('id', 'name', 'price_per_day')
    ->where('available', true)
    ->get(),
        ]);
    }

   public function storeBooking(StoreBookingRequest $request): RedirectResponse
{
    $this->bookingService->create($request->validated());

    return back()->with('success', 'Booking created successfully.');
}


/**
 * Update an existing booking
 */
public function updateBooking(StoreBookingRequest $request, Booking $booking)
{
    try {
        $updatedBooking = $this->bookingService->update(
            $booking,
            $request->validated()
        );

        return redirect()
            ->route('bookings.index')
            ->with('success', 'Booking updated successfully.');

    } catch (\Exception $e) {
        return redirect()
            ->back()
            ->with('error', $e->getMessage())
            ->withInput();
    }
}
    public function dashboard(): Response
{
    return Inertia::render('Dashboard', [
        'stats' => [
            'totalRevenue'  => Booking::sum('total_price'),
            'totalBookings' => Booking::count(),
            'totalCustomers'=> Customer::count(),
            'totalVehicles' => Vehicle::count(),
        ],

        // latest bookings with relations
        'recentBookings' => Booking::with(['customer', 'vehicle'])
            ->latest()
            ->take(5)
            ->get()
    ]);
}

    public function deleteBooking(Booking $booking): RedirectResponse
    {
        $this->bookingService->delete($booking);

        return back()->with('success', 'Booking deleted successfully.');
    }
}
