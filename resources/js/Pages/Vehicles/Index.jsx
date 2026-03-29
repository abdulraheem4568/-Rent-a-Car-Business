// resources/js/Pages/Vehicles/Index.jsx
import { useForm, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Loader2, Car, Plus, Edit, Trash2 } from "lucide-react";

export default function Index({ vehicles }) {
    const { data, setData, processing, reset, errors: formErrors } = useForm({
        name: "",
        type: "",
        seats: "",
        price_per_day: "",
        available: true,
    });

    const [vehicleList, setVehicleList] = useState(vehicles || []);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        setVehicleList(vehicles || []);
    }, [vehicles]);

    // Submit - Create or Update
    const submit = (e) => {
        e.preventDefault();

        if (editingId) {
            router.put(route('vehicles.update', editingId), data, {
                preserveScroll: true,
                onSuccess: (page) => {
                    reset();
                    setEditingId(null);
                    setVehicleList(page.props.vehicles || []);
                    toast.success(" Vehicle Updated successfully!");
                },
            });
        } else {
            router.post(route('vehicles.store'), data, {
                preserveScroll: true,
                onSuccess: (page) => {
                    reset();
                    setVehicleList(page.props.vehicles || []);
                    toast.success(" Vehicle Created successfully!");
                },
            });
        }
    };

    const handleEdit = (vehicle) => {
        setEditingId(vehicle.id);
        setData({
            name: vehicle.name || "",
            type: vehicle.type || "",
            seats: vehicle.seats || "",
            price_per_day: vehicle.price_per_day || "",
            available: !!vehicle.available,
        });
    };

    const cancelEdit = () => {
        reset();
        setEditingId(null);
    };

    const handleDelete = (id) => {
        if (!confirm("Are you sure you want to delete this vehicle?")) return;

        router.delete(route('vehicles.delete', id), {
            preserveScroll: true,
            onSuccess: (page) => {
                setVehicleList(page.props.vehicles || []);
                toast.success(" Vehicle deleted successfully!");
            },
            onError: () => toast.error("Failed to delete vehicle"),
        });
    };

    const toggleAvailability = (id, currentStatus) => {
        router.put(route('vehicles.toggle', id), {
            available: !currentStatus
        }, {
            preserveScroll: true,
            onSuccess: (page) => setVehicleList(page.props.vehicles || []),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <Car className="w-6 h-6 text-indigo-600" />
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Vehicles</h2>
                </div>
            }
        >
            <div className="p-6 mx-auto space-y-10 max-w-7xl">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Vehicle Fleet</h1>
                    <p className="mt-1 text-muted-foreground">Manage your vehicles and rental pricing</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

                    {/* Form Section */}
                    <div className="lg:col-span-5">
                        <Card className="overflow-hidden border shadow-sm">
                            <CardHeader className="pb-6 border-b">
                                <CardTitle className="flex items-center gap-3 text-xl">
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        {editingId ? <Edit className="w-5 h-5 text-indigo-600" /> : <Plus className="w-5 h-5 text-indigo-600" />}
                                    </div>
                                    {editingId ? "Edit Vehicle" : "Add New Vehicle"}
                                </CardTitle>
                                <CardDescription>
                                    {editingId ? "Update vehicle details" : "Add a new vehicle to your rental fleet"}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-8">
                                <form onSubmit={submit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Vehicle Name <span className="text-red-500">*</span></Label>
                                        <Input id="name" value={data.name} onChange={(e) => setData("name", e.target.value)} placeholder="e.g. Toyota Corolla GLi" className="h-11" />
                                        {formErrors?.name && <p className="text-sm text-red-600">{formErrors.name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="type">Vehicle Type <span className="text-red-500">*</span></Label>
                                        <Input id="type" value={data.type} onChange={(e) => setData("type", e.target.value)} placeholder="e.g. Sedan, SUV" className="h-11" />
                                        {formErrors?.type && <p className="text-sm text-red-600">{formErrors.type}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="seats">Seats</Label>
                                            <Input id="seats" type="number" min="1" value={data.seats} onChange={(e) => setData("seats", e.target.value)} placeholder="4" className="h-11" />
                                            {formErrors?.seats && <p className="text-sm text-red-600">{formErrors.seats}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="price_per_day">Price Per Day (Rs.)</Label>
                                            <Input id="price_per_day" type="number" min="0" value={data.price_per_day} onChange={(e) => setData("price_per_day", e.target.value)} placeholder="5000" className="h-11" />
                                            {formErrors?.price_per_day && <p className="text-sm text-red-600">{formErrors.price_per_day}</p>}
                                        </div>
                                    </div>

                                    {/* Simple Custom Toggle */}
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <Label className="text-sm font-medium">Available for Booking</Label>
                                        <div 
                                            onClick={() => setData("available", !data.available)}
                                            className={`relative w-14 h-8 flex items-center rounded-full cursor-pointer transition-colors duration-300 ${data.available ? 'bg-indigo-600' : 'bg-gray-300'}`}
                                        >
                                            <div 
                                                className={`absolute w-7 h-7 bg-white rounded-full shadow-md transition-transform duration-300 ${data.available ? 'translate-x-7' : 'translate-x-1'}`}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700" disabled={processing}>
                                            {processing ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    {editingId ? "Updating..." : "Adding Vehicle..."}
                                                </>
                                            ) : editingId ? "Update Vehicle" : "Add Vehicle"}
                                        </Button>

                                        {editingId && (
                                            <Button type="button" variant="outline" onClick={cancelEdit} className="flex-1">
                                                Cancel
                                            </Button>
                                        )}
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Table Section */}
                    <div className="lg:col-span-7">
                        <Card className="border shadow-sm">
                            <CardHeader>
                                <CardTitle>All Vehicles</CardTitle>
                                <CardDescription>Total Vehicles: {vehicleList.length}</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="overflow-x-auto bg-white border rounded-xl">
                                    <table className="w-full min-w-full">
                                        <thead>
                                            <tr className="border-b bg-muted/60">
                                                <th className="px-6 py-4 font-semibold text-left">Vehicle Name</th>
                                                <th className="px-6 py-4 font-semibold text-left">Type</th>
                                                <th className="px-6 py-4 font-semibold text-center">Seats</th>
                                                <th className="px-6 py-4 font-semibold text-right">Price / Day</th>
                                                <th className="px-6 py-4 font-semibold text-center">Available</th>
                                                <th className="px-6 py-4 font-semibold text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {vehicleList.length > 0 ? (
                                                vehicleList.map((vehicle) => (
                                                    <tr key={vehicle.id} className="hover:bg-muted/50">
                                                        <td className="px-6 py-4 font-medium">{vehicle.name}</td>
                                                        <td className="px-6 py-4 text-muted-foreground">{vehicle.type}</td>
                                                        <td className="px-6 py-4 text-center">{vehicle.seats}</td>
                                                        <td className="px-6 py-4 font-medium text-right text-emerald-600">
                                                            Rs. {parseInt(vehicle.price_per_day || 0).toLocaleString()}
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            {/* Simple Toggle in Table */}
                                                            <div 
                                                                onClick={() => toggleAvailability(vehicle.id, vehicle.available)}
                                                                className={`relative w-14 h-8 mx-auto flex items-center rounded-full cursor-pointer transition-colors duration-300 ${vehicle.available ? 'bg-emerald-500' : 'bg-gray-300'}`}
                                                            >
                                                                <div 
                                                                    className={`absolute w-7 h-7 bg-white rounded-full shadow-md transition-transform duration-300 ${vehicle.available ? 'translate-x-7' : 'translate-x-1'}`}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="flex justify-center gap-2 px-6 py-4">
                                                            <Button size="sm" variant="outline" onClick={() => handleEdit(vehicle)}>
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                            <Button size="sm" variant="destructive" onClick={() => handleDelete(vehicle.id)}>
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={6} className="py-20 text-center text-muted-foreground">
                                                        <Car className="w-12 h-12 mx-auto mb-4 opacity-40" />
                                                        <p className="font-medium">No vehicles added yet</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}