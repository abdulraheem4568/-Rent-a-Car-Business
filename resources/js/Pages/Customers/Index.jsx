// resources/js/Pages/Customers/Index.jsx
import { useForm, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, UserPlus, Users, Edit, Trash2 } from "lucide-react";

export default function Index({ customers, errors }) {
  const { data, setData, post, put, processing, reset, errors: formErrors } = useForm({
    name: "",
    email: "",
    phone: "",
  });

  const [customerList, setCustomerList] = useState(customers || []);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setCustomerList(customers || []);
  }, [customers]);

  // CREATE OR UPDATE
  const submit = (e) => {
    e.preventDefault();

    if (editingId) {
      put(`/customers/${editingId}`, {
        onSuccess: (page) => {
          setCustomerList(page.props.customers || []);
           toast.success(" Customer Updated successfully!");
          reset();
          setEditingId(null);
        },
      });
    } else {
      post("/customers", {
        onSuccess: (page) => {
          setCustomerList(page.props.customers || []);
           toast.success(" Customer Created successfully!");
          reset();
        },
      });
    }
  };

  // EDIT FUNCTION
  const handleEdit = (customer) => {
    setEditingId(customer.id);
    setData({
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
    });
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    reset();
    setEditingId(null);
  };

  // DELETE FUNCTION
 const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;

    router.delete(`/customers/${id}`, {
        onSuccess: (page) => {
            setCustomerList(page.props.customers || []);
            toast.success(" Customer deleted successfully!");
        },
        onError: () => toast.error("Failed to delete customer"),
    });
};

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-indigo-600" />
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Customers</h2>
          </div>
          <p className="text-sm text-muted-foreground">Manage your customer database</p>
        </div>
      }
    >
      <div className="p-6 mx-auto space-y-10 max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

          {/* FORM */}
          <div className="lg:col-span-5">
            <Card className="overflow-hidden border shadow-sm border-border/60">
              <CardHeader className="pb-6 border-b">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <UserPlus className="w-5 h-5 text-indigo-600" />
                  </div>
                  {editingId ? "Edit Customer" : "Add New Customer"}
                </CardTitle>
                <CardDescription className="text-base">
                  {editingId
                    ? "Update existing customer details"
                    : "Fill in the details to create a new customer record"}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-8">
                <form onSubmit={submit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter customer's full name"
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                      className="h-11"
                    />
                    {formErrors?.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="customer@example.com"
                      value={data.email}
                      onChange={(e) => setData("email", e.target.value)}
                      className="h-11"
                    />
                    {formErrors?.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+92 300 1234567"
                      value={data.phone}
                      onChange={(e) => setData("phone", e.target.value)}
                      className="h-11"
                    />
                    {formErrors?.phone && <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium text-white transition-colors duration-200 bg-indigo-800 rounded-lg shadow-md transition-allbg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {editingId ? "Updating Customer..." : "Creating Customer..."}
                      </>
                    ) : editingId ? (
                      "Update Customer"
                    ) : (
                      "Create Customer"
                    )}
                  </Button>

                  {editingId && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* TABLE */}
          <div className="lg:col-span-7">
            <Card className="border shadow-sm border-border/60">
              <CardHeader className="flex flex-row items-center justify-between pb-6">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">All Customers</CardTitle>
                  <CardDescription>
                    Total Records:{" "}
                    <span className="font-semibold text-foreground">{customerList.length}</span>
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <div className="overflow-hidden bg-white border rounded-xl">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableHead className="font-semibold text-foreground">Name</TableHead>
                        <TableHead className="font-semibold text-foreground">Email</TableHead>
                        <TableHead className="font-semibold text-foreground">Phone</TableHead>
                        <TableHead className="font-semibold text-center text-foreground">Actions</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {customerList.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="h-64 text-center">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <Users className="w-12 h-12 mb-4 opacity-40" />
                              <p className="text-lg font-medium">No customers yet</p>
                              <p className="text-sm">
                                Add your first customer using the form on the left.
                              </p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        customerList.map((customer) => (
                          <TableRow key={customer.id} className="transition-colors hover:bg-muted/70 group">
                            <TableCell className="font-medium text-foreground">{customer.name}</TableCell>
                            <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {customer.phone || <span className="text-muted-foreground/60">—</span>}
                            </TableCell>
                            <TableCell className="flex justify-center gap-2 p-2">
                              <Button size="sm" variant="outline" onClick={() => handleEdit(customer)}>
                                <Edit size={16} />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDelete(customer.id)}>
                                <Trash2 size={16} />
                              </Button>
                            </TableCell>
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