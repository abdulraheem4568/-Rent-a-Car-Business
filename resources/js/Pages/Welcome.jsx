import { Head, Link } from '@inertiajs/react';

export default function WelcomeVehicleBooking({ auth }) {
    return (
        <>
            <Head title="Vehicle Booking System" />

            <div className="flex flex-col items-center justify-center min-h-screen p-6 text-black bg-gray-50 dark:bg-black dark:text-white">

                {/* Title */}
                <h1 className="mb-6 text-4xl font-bold text-center">
                    Vehicle Booking System - Rent-a-Car Business
                </h1>

                {/* Content */}
                <p className="max-w-2xl mb-8 text-lg text-center">
                    Our Vehicle Booking System is designed to streamline the operations of your rent-a-car business. 
                    With this system, you can efficiently manage customers, vehicles, and bookings in one place. 
                    Here's what you can do:
                    <ul className="mt-4 text-left list-disc list-inside">
                        <li>Create and manage customer records for easy reference and tracking.</li>
                        <li>Add vehicles to your fleet, keep them updated, and mark availability for booking.</li>
                        <li>Book vehicles against specific customers, keeping a clear record of who has booked which vehicle and when.</li>
                        <li>Maintain accurate booking history to improve business management and customer satisfaction.</li>
                    </ul>
                    This system helps reduce manual work, avoid double bookings, and provides a clear overview of your business operations.
                </p>

                {/* Dashboard Button */}
                <Link
                    href={route('dashboard')}
                    className="px-6 py-3 bg-[#FF2D20] text-white rounded-md text-lg font-medium hover:bg-[#e0261c] transition"
                >
                    Go to Dashboard
                </Link>
            </div>
        </>
    );
}