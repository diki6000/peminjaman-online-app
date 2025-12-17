<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JenisRekening; // <-- Import the model

class JenisRekeningSeeder extends Seeder
{
    public function run(): void
    {
        // Use updateOrCreate to avoid creating duplicates if you run the seeder again
        JenisRekening::updateOrCreate(['nama_jenis' => 'BANK']);
        JenisRekening::updateOrCreate(['nama_jenis' => 'EWALLET']);
    }
}
