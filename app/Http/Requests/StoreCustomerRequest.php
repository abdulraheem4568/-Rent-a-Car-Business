<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCustomerRequest extends FormRequest
{
    public function authorize() { return true; }

public function rules(): array
{
    return [
        'name'  => ['required', 'string', 'max:255'],
        'email' => [
            'required',
            'email',
            Rule::unique('customers')->ignore($this->customer)
        ],
        'phone' => ['required', 'string', 'max:20'],
    ];
}
}
