<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\KanalPembayaran; // Import the model
use App\Models\JenisRekening;  // We need this to get the ID for 'BANK'

class KanalPembayaranSeeder extends Seeder
{
    public function run(): void
    {
        // Find the ID for the 'BANK' account type first
        $bankTypeId = JenisRekening::where('nama_jenis', 'BANK')->first()->id;

        KanalPembayaran::updateOrCreate(
            ['nomor_rekening' => '1234567890'], // Use a unique value to find the record
            [
                'jenis_rekening_id' => $bankTypeId,
                'nama_kanal' => 'BCA Virtual Account',
                'nama_pemilik_rekening' => 'PT Peminjaman Uang Online',
                'is_active' => true,
            ]
        );
    }
}