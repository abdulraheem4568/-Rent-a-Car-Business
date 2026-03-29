import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Index({ bookings, customers, vehicles }) {
  const { data, setData, post, processing, reset } = useForm({
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
    <AuthenticatedLayout
      header={
        <h2 className="text-2xl font-bold text-gray-800">Booking Management</h2>
      }
    >
      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">

        {/* LEFT SIDE - FORM */}
        <Card className="shadow-xl lg:col-span-1 rounded-2xl">
          <CardHeader>
            <CardTitle>Create Booking</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={submit} className="space-y-4">

              {/* Customer */}
              <div>
                <label className="text-sm font-medium">Customer</label>
                <Select
                  value={data.customer_id}
                  onValueChange={(value) => setData("customer_id", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Vehicle */}
              <div>
                <label className="text-sm font-medium">Vehicle</label>
                <Select
                  value={data.vehicle_id}
                  onValueChange={(value) => setData("vehicle_id", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map((v) => (
                      <SelectItem key={v.id} value={String(v.id)}>
                        {v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    type="date"
                    value={data.start_date}
                    onChange={(e) => setData("start_date", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">End Date</label>
                  <Input
                    type="date"
                    value={data.end_date}
                    onChange={(e) => setData("end_date", e.target.value)}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl"
                disabled={processing}
              >
                {processing ? "Creating..." : "Create Booking"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* RIGHT SIDE - TABLE */}
        <Card className="shadow-xl lg:col-span-2 rounded-2xl">
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Start</TableHead>
                    <TableHead>End</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {bookings.length > 0 ? (
                    bookings.map((b) => (
                      <TableRow key={b.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          {b.customer?.name}
                        </TableCell>
                        <TableCell>{b.vehicle?.name}</TableCell>
                        <TableCell>{b.start_date}</TableCell>
                        <TableCell>{b.end_date}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="4" className="py-6 text-center">
                        No bookings found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
