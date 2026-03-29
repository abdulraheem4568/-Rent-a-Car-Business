<?php
namespace App\Services;

use App\Models\Customer;

class CustomerService
{
    public function all()
    {
        return Customer::orderBy('created_at','desc')->get();
    }

    public function create(array $data)
    {
        return Customer::create($data);
    }

    public function update(Customer $customer, array $data)
    {
        $customer->update($data);
        return $customer;
    }

    public function delete(Customer $customer)
    {
        $customer->delete();
    }
}