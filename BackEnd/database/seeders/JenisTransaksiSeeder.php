<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JenisTransaksi; // Import the model

class JenisTransaksiSeeder extends Seeder
{
    public function run(): void
    {
        JenisTransaksi::updateOrCreate(['nama_jenis' => 'PENCAIRAN_DANA']);
        JenisTransaksi::updateOrCreate(['nama_jenis' => 'PEMBAYARAN_ANGSURAN']);
        JenisTransaksi::updateOrCreate(['nama_jenis' => 'PEMBAYARAN_DENDA']);
    }
}