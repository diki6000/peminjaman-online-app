<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePaketKreditRequest extends FormRequest
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
            'nama_paket'      => 'required|string|max:255',
            'deskripsi'       => 'nullable|string',
            'banyak_angsuran' => 'required|integer|min:1',
            'bunga_persen'    => 'required|numeric|min:0',
            'denda_flat'      => 'required|numeric|min:0',
            'is_active'       => 'sometimes|boolean', // 'sometimes' means it's only validated if present
        ];
    }
}
