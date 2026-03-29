export default function Table({ columns, data }) {
    return (
        <table className="w-full border mt-4">
            <thead>
                <tr className="bg-gray-100">
                    {columns.map((col, i) => (
                        <th key={i} className="p-2 border text-left">
                            {col}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr key={i}>
                        {Object.values(row).map((val, j) => (
                            <td key={j} className="p-2 border">
                                {val}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}