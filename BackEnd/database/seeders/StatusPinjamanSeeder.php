<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\StatusPinjaman;

class StatusPinjamanSeeder extends Seeder
{
    public function run(): void
    {
        StatusPinjaman::insert([
            ['nama_status' => 'PENDING_REVIEW'],
            ['nama_status' => 'DISETUJUI'],
            ['nama_status' => 'DITOLAK'],
            ['nama_status' => 'MENUNGGU_PENCAIRAN'],
            ['nama_status' => 'BERJALAN'],
            ['nama_status' => 'DIBATALKAN'],
            ['nama_status' => 'SELESAI'],
            ['nama_status' => 'MACET'],
        ]);
    }
}