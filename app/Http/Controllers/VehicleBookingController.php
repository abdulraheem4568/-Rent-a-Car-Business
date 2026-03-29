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
    public function dashboard(): Response
    {
        return Inertia::render('Dashboard/Index', [
            'stats' => [
                'totalRevenue'  => Booking::sum('total_price'),
                'totalBookings' => Booking::count(),
                'totalCustomers'=> Customer::count(),
                'totalVehicles' => Vehicle::count(),
            ]
        ]);
    }

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

    public function storeVehicle(StoreVehicleRequest $request): Response
{
    $this->vehicleService->create($request->validated());

    return Inertia::render('Vehicles/Index', [
        'vehicles' => $this->vehicleService->all(),
        'flash' => ['success' => 'Vehicle created successfully']
    ]);
}

    public function deleteVehicle(Vehicle $vehicle): RedirectResponse
    {
        $this->vehicleService->delete($vehicle);

        return back()->with('success', 'Vehicle deleted successfully.');
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
            'vehicles'  => Vehicle::select('id', 'name')->where('available', true)->get(),
        ]);
    }

    public function storeBooking(StoreBookingRequest $request): RedirectResponse
    {
        try {
            $this->bookingService->create($request->validated());

            return back()->with('success', 'Booking created successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function deleteBooking(Booking $booking): RedirectResponse
    {
        $this->bookingService->delete($booking);

        return back()->with('success', 'Booking deleted successfully.');
    }
}
