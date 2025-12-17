<?php
namespace Database\Seeders;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            StatusPenggunaSeeder::class,
            StatusPinjamanSeeder::class,
            JenisRekeningSeeder::class,
            StatusAngsuranSeeder::class,
            JenisTransaksiSeeder::class,
            TingkatKreditSeeder::class,
            PaketKreditSeeder::class,
            KanalPembayaranSeeder::class,
        ]);

        // Create the Admin User
        User::create([
            'nama_lengkap' => 'Admin User',
            'email' => 'admin@example.com',
            'no_hp' => '081234567890',
            'password' => Hash::make('password'),
            'role_id' => 1,
            'status_pengguna_id' => 3,
            'kredit_skor' => 999,
            // 'limit_pinjaman' => 100000000, // <-- DELETE THIS LINE
        ]);

        // Create the Test User
        User::create([
            'nama_lengkap' => 'Test User',
            'email' => 'test@example.com',
            'no_hp' => '089876543210',
            'password' => Hash::make('password'),
            'role_id' => 2,
            'status_pengguna_id' => 1,
            // The Test User didn't have this line, which is good.
        ]);
    }
}