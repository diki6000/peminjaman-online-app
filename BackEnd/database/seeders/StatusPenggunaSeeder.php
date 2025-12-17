<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\StatusPengguna; 

class StatusPenggunaSeeder extends Seeder
{
    public function run(): void
    {
        StatusPengguna::create(['nama_status' => 'UNVERIFIED', 'deskripsi' => 'User has registered but not submitted data.']);
        StatusPengguna::create(['nama_status' => 'PENDING_VERIFICATION', 'deskripsi' => 'User has submitted data, waiting for admin approval.']);
        StatusPengguna::create(['nama_status' => 'VERIFIED', 'deskripsi' => 'User is verified and can apply for loans.']);
        StatusPengguna::create(['nama_status' => 'REJECTED', 'deskripsi' => 'User verification was rejected by admin.']);
    }
}
