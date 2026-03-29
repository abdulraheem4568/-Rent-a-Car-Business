import { useForm } from "@inertiajs/react";
import Input from "@/Components/Input";
// import Button from "@/Components/Button";

export default function Index({ bookings, customers, vehicles }) {
    const { data, setData, post, reset } = useForm({
        customer_id: "",
        vehicle_id: "",
        start_date: "",
        end_date: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/bookings", {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="p-6">
            <h1 className="mb-4 text-xl font-bold">Bookings</h1>

            <form onSubmit={submit} className="max-w-md">

                <select onChange={e => setData("customer_id", e.target.value)}>
                    <option>Select Customer</option>
                    {customers.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>

                <select onChange={e => setData("vehicle_id", e.target.value)}>
                    <option>Select Vehicle</option>
                    {vehicles.map(v => (
                        <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                </select>

                <Input type="date" label="Start Date" onChange={e => setData("start_date", e.target.value)} />
                <Input type="date" label="End Date" onChange={e => setData("end_date", e.target.value)} />

                <button type="submit">Create Booking</button>
            </form>

            <table className="w-full mt-6 border">
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Vehicle</th>
                        <th>Dates</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(b => (
                        <tr key={b.id}>
                            <td>{b.customer.name}</td>
                            <td>{b.vehicle.name}</td>
                            <td>{b.start_date} → {b.end_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
