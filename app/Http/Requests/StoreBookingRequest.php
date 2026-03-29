<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function authorize() { return true; }

   public function rules(): array
{
    return [
        'customer_id' => ['required', 'exists:customers,id'],
        'vehicle_id'  => ['required', 'exists:vehicles,id'],

        'start_date'  => ['required', 'date', 'before:end_date'],
        'end_date'    => ['required', 'date', 'after:start_date'],

        'total_price' => ['required', 'numeric', 'min:0'],
    ];
}
}