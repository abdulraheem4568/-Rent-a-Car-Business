<?php 

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleRequest extends FormRequest
{
    public function authorize() { return true; }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:100',
            'seats' => 'required|integer|min:1',
            'price_per_day' => 'required|numeric|min:0',
        ];
    }
}