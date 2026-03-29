import { useForm } from "@inertiajs/react";
import Input from "@/Components/Input";
import { useState } from "react";
// import Button from "@/Components/Button";

export default function Index({ vehicles }) {
    const { data, setData, post, reset } = useForm({
        name: "",
        type: "",
        seats: "",
        price_per_day: "",
    });
    const [vehicleList, setVehicleList] = useState(vehicles);

    const submit = (e) => {
        e.preventDefault();
        post("/vehicles", {
            onSuccess: (page) => {
            reset();

            setVehicleList(page.props.vehicles);
        },
        onError: () => alert("Failed to create vehicle"),
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Vehicles</h1>

            <form onSubmit={submit} className="max-w-md">
                <Input label="Name" value={data.name} onChange={e => setData("name", e.target.value)} />
                <Input label="Type" value={data.type} onChange={e => setData("type", e.target.value)} />
                <Input label="Seats" type="number" value={data.seats} onChange={e => setData("seats", e.target.value)} />
                <Input label="Price Per Day" value={data.price_per_day} onChange={e => setData("price_per_day", e.target.value)} />

                <button type="submit">Create Vehicle</button>
            </form>

            <table className="w-full mt-6 border">
                <thead>
                    <tr className="bg-gray-100">
                        <th>Name</th>
                        <th>Type</th>
                        <th>Seats</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicleList.map(v => (
                        <tr key={v.id}>
                            <td>{v.name}</td>
                            <td>{v.type}</td>
                            <td>{v.seats}</td>
                            <td>{v.price_per_day}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
