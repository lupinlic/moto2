<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'OrderDate' => 'required|string',
        ];
    }
    protected function prepareForValidation()
    {
        if ($this->has('OrderDate')) {
            $this->merge([
                'OrderDate' => Carbon::now()->format('Y-m-d') . " {$this->OrderDate}:00"
            ]);
        }
    }
}