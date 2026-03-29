import { useForm } from "@inertiajs/react";
import { useState } from "react";
import Input from "@/Components/Input";

export default function Index({ customers }) {
    const { data, setData, post, reset } = useForm({
        name: "",
        email: "",
        phone: "",
    });

    const [customerList, setCustomerList] = useState(customers);

   const submit = (e) => {
    e.preventDefault();

    post("/customers", {
        onSuccess: (page) => {
            reset();

            // Use updated customers prop from backend
            setCustomerList(page.props.customers);
        },
        onError: () => alert("Failed to create customer"),
    });
};

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Customers</h1>

            <form onSubmit={submit} className="max-w-md">
                <Input label="Name" value={data.name} onChange={e => setData("name", e.target.value)} />
                <Input label="Email" value={data.email} onChange={e => setData("email", e.target.value)} />
                <Input label="Phone" value={data.phone} onChange={e => setData("phone", e.target.value)} />
                <button type="submit">Create Customer</button>
            </form>

            <table className="w-full mt-6 border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {customerList.map(c => (
                        <tr key={c.id}>
                            <td className="p-2 border">{c.name}</td>
                            <td className="p-2 border">{c.email}</td>
                            <td className="p-2 border">{c.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
