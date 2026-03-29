// resources/js/Pages/Customers/Index.jsx
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, UserPlus } from "lucide-react";

export default function Index({ customers, errors }) {
  const { data, setData, post, processing, reset } = useForm({
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
        // Update local state with fresh data from backend
        setCustomerList(page.props.customers || []);
      },
      onError: () => {
        // You can show better error handling here later
        console.error("Failed to create customer");
      },
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-2xl font-semibold text-gray-800">Customers</h2>
      }
    >
      <div className="p-6 mx-auto space-y-8 max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

          {/* Create New Customer Form */}
          <div className="lg:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Add New Customer
                </CardTitle>
                <CardDescription>
                  Create a new customer record
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={submit} className="space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter customer name"
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                    />
                    {errors?.name && (
                      <p className="text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="customer@example.com"
                      value={data.email}
                      onChange={(e) => setData("email", e.target.value)}
                    />
                    {errors?.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+92 300 1234567"
                      value={data.phone}
                      onChange={(e) => setData("phone", e.target.value)}
                    />
                    {errors?.phone && (
                      <p className="text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={processing}
                  >
                    {processing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Create Customer
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Customers Table */}
          <div className="lg:col-span-7">
            <Card>
              <CardHeader>
                <CardTitle>All Customers</CardTitle>
                <CardDescription>
                  Total Customers: <span className="font-medium">{customerList.length}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customerList.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={3}
                            className="py-12 text-center text-muted-foreground"
                          >
                            No customers found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        customerList.map((customer) => (
                          <TableRow key={customer.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium">{customer.name}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.phone || "—"}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
