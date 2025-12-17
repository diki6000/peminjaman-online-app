<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StatusAngsuran; // Import the model

class StatusAngsuranSeeder extends Seeder
{
    public function run(): void
    {
        StatusAngsuran::updateOrCreate(
            ['nama_status' => 'BELUM_DIBAYAR'],
            ['deskripsi' => 'Angsuran belum dibayar dan belum melewati jatuh tempo.']
        );

        StatusAngsuran::updateOrCreate(
            ['nama_status' => 'LUNAS'],
            ['deskripsi' => 'Angsuran telah berhasil dibayar lunas.']
        );

        StatusAngsuran::updateOrCreate(
            ['nama_status' => 'TERLAMBAT'],
            ['deskripsi' => 'Angsuran belum dibayar dan telah melewati jatuh tempo.']
        );
    }
}