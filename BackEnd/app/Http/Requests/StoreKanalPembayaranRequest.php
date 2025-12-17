<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreKanalPembayaranRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Assuming any admin can manage this
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            // Ensure the ID exists in the 'jenis_rekenings' table
            'jenis_rekening_id'     => 'required|integer|exists:jenis_rekenings,id',
            'nama_kanal'            => 'required|string|max:255',
            'nama_pemilik_rekening' => 'required|string|max:255',
            'nomor_rekening'        => 'required|string|max:50',
            'is_active'             => 'sometimes|boolean',
        ];
    }
}