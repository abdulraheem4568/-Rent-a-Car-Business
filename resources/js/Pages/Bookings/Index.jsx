import { useForm, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Loader2, Calendar, Edit, Trash2, Plus } from "lucide-react";

export default function Index({ bookings, customers, vehicles }) {

    const { data, setData, processing, reset, errors, post, put } = useForm({
        customer_id: "",
        vehicle_id: "",
        start_date: "",
        end_date: "",
        total_price: 0,
    });

    const [bookingList, setBookingList] = useState(bookings || []);
    const [editingId, setEditingId] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setBookingList(bookings || []);
    }, [bookings]);
    const handleDelete = (id) => {
    if (!confirm("Are you sure?")) return;

    router.delete(route('bookings.delete', id), {
        preserveScroll: true,
        onSuccess: () => {
            setBookingList(prev => prev.filter(b => b.id !== id));
            toast.success(" Booking Deleted successfully!");
        }
    });
};

    useEffect(() => {
        if (data.start_date && data.end_date && selectedVehicle) {
            const start = new Date(data.start_date);
            const end = new Date(data.end_date);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

            if (days > 0) {
                const total = days * selectedVehicle.price_per_day;
                setTotalPrice(total);
                setData("total_price", total);
            } else setTotalPrice(0);
        }
    }, [data.start_date, data.end_date, selectedVehicle]);

    const submit = (e) => {
        e.preventDefault();

        editingId
            ? put(route('bookings.update', editingId), {
                  onSuccess: () => {
                      reset();
                      toast.success(" Booking Updated successfully!");
                      setEditingId(null);
                  },
              })
            : post(route('bookings.store'), {
                  onSuccess: () => {
                      reset();
                      toast.success(" Booking Created successfully!");
                      setSelectedVehicle(null);
                      setTotalPrice(0);
                  },
              });
    };
        const cancelEdit = () => {
    reset();
    setEditingId(null);
    setSelectedVehicle(null);
    setTotalPrice(0);
};

    const handleEdit = (booking) => {
        setEditingId(booking.id);
        const vehicle = vehicles.find(v => v.id == booking.vehicle_id);
        setSelectedVehicle(vehicle);

        setData({
            customer_id: booking.customer_id,
            vehicle_id: booking.vehicle_id,
            start_date: booking.start_date,
            end_date: booking.end_date,
            total_price: booking.total_price,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-xl">
                        <Calendar className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">
                        Booking Management
                    </h2>
                </div>
            }
        >
            <div className="grid gap-8 p-6 mx-auto max-w-7xl lg:grid-cols-12">

                {/* FORM */}
                <div className="lg:col-span-5">
                    <Card className="border-0 shadow-xl rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-indigo-600">
                                {editingId ? "Edit Booking" : "New Booking"}
                            </CardTitle>
                            <CardDescription>
                                Create booking with automatic pricing
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={submit} className="space-y-5">

                                {/* Customer */}
                                <div>
                                    <Label>Customer</Label>
                                    <select
                                        value={data.customer_id}
                                        onChange={(e) => setData("customer_id", e.target.value)}
                                        className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
                                    >
                                        <option value="">Select Customer</option>
                                        {customers.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Vehicle */}
                                <div>
                                    <Label>Vehicle</Label>
                                    <select
                                        value={data.vehicle_id}
                                        onChange={(e) => {
                                            const id = e.target.value;
                                            setData("vehicle_id", id);
                                            setSelectedVehicle(vehicles.find(v => v.id == id));
                                        }}
                                        className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
                                    >
                                        <option value="">Select Vehicle</option>
                                        {vehicles.map(v => (
                                            <option key={v.id} value={v.id}>{v.name}</option>
                                        ))}
                                    </select>

                                    {selectedVehicle && (
                                        <p className="mt-1 text-sm text-gray-500">
                                            Rs {selectedVehicle.price_per_day} / day
                                        </p>
                                    )}
                                </div>

                                {/* Dates */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <Label>Start Date</Label>
                                        <Input type="date"
                                            value={data.start_date}
                                            onChange={(e) => setData("start_date", e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <Label>End Date</Label>
                                        <Input type="date"
                                            value={data.end_date}
                                            onChange={(e) => setData("end_date", e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Total */}
                                {totalPrice > 0 && (
                                    <div className="p-4 border bg-gradient-to-r from-green-100 to-green-50 rounded-xl">
                                        <p className="text-lg font-semibold text-green-700">
                                            Total: Rs {totalPrice}
                                        </p>
                                    </div>
                                )}

                                <Button className="flex items-center justify-center w-full gap-2 font-semibold text-white transition-colors duration-200 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                                    {processing ? <Loader2 className="animate-spin" /> :
                                        <>
                                            <Plus size={18} />
                                            {editingId ? "Update Booking" : "Create Booking"}
                                        </>
                                    }
                                </Button>

                                {editingId && (
                                    <Button variant="outline" className="w-full" onClick={cancelEdit}>
                                        Cancel
                                    </Button>
                                )}

                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* TABLE */}
                <div className="lg:col-span-7">
                    <Card className="border-0 shadow-xl rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-gray-700">
                                All Bookings
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="text-gray-600 bg-gray-100">
                                        <tr>
                                            <th className="p-3 text-left">Customer</th>
                                            <th className="p-3 text-left">Vehicle</th>
                                            <th className="p-3">Start</th>
                                            <th className="p-3">End</th>
                                            <th className="p-3">Total</th>
                                            <th className="p-3">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {bookingList.map(b => (
                                            <tr key={b.id}
                                                className="transition border-b hover:bg-gray-50">
                                                <td className="p-3">{b.customer?.name}</td>
                                                <td className="p-3">{b.vehicle?.name}</td>
                                                <td className="p-3">{b.start_date}</td>
                                                <td className="p-3">{b.end_date}</td>
                                                <td className="p-3 font-semibold text-green-600">
                                                    Rs {b.total_price}
                                                </td>
                                                <td className="flex gap-2 p-3">
                                                    <Button size="sm" variant="outline"
                                                        onClick={() => handleEdit(b)}>
                                                        <Edit size={16} />
                                                    </Button>
                                                   <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDelete(b.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                                                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
