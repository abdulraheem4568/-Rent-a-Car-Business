export default function Input({ label, ...props }) {
    return (
        <div className="mb-3">
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
                {...props}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
        </div>
    );
}