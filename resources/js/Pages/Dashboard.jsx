import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ stats, recentBookings }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">

                    {/* 🔹 Stats Cards */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">

                        <div className="p-4 bg-white rounded shadow">
                            <p className="text-gray-500">Total Revenue</p>
                            <h2 className="text-2xl font-bold">
                                Rs {stats.totalRevenue}
                            </h2>
                        </div>

                        <div className="p-4 bg-white rounded shadow">
                            <p className="text-gray-500">Total Bookings</p>
                            <h2 className="text-2xl font-bold">
                                {stats.totalBookings}
                            </h2>
                        </div>

                        <div className="p-4 bg-white rounded shadow">
                            <p className="text-gray-500">Customers</p>
                            <h2 className="text-2xl font-bold">
                                {stats.totalCustomers}
                            </h2>
                        </div>

                        <div className="p-4 bg-white rounded shadow">
                            <p className="text-gray-500">Vehicles</p>
                            <h2 className="text-2xl font-bold">
                                {stats.totalVehicles}
                            </h2>
                        </div>

                    </div>

                    {/* 🔹 Recent Bookings */}
                    <div className="p-6 bg-white rounded shadow">
                        <h3 className="mb-4 text-lg font-semibold">
                            Recent Bookings
                        </h3>

                        <table className="w-full border">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 border">Customer</th>
                                    <th className="p-2 border">Vehicle</th>
                                    <th className="p-2 border">Start Date</th>
                                    <th className="p-2 border">End Date</th>
                                    <th className="p-2 border">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentBookings.length > 0 ? (
                                    recentBookings.map(b => (
                                        <tr key={b.id}>
                                            <td className="p-2 border">
                                                {b.customer?.name}
                                            </td>
                                            <td className="p-2 border">
                                                {b.vehicle?.name}
                                            </td>
                                            <td className="p-2 border">
                                                {b.start_date}
                                            </td>
                                            <td className="p-2 border">
                                                {b.end_date}
                                            </td>
                                            <td className="p-2 border">
                                                Rs {b.total_price}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="p-4 text-center">
                                            No bookings found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}