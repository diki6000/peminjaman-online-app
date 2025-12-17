<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\PaketKredit;

class PaketKreditSeeder extends Seeder
{
    public function run(): void
    {
        PaketKredit::create([
            'nama_paket' => 'Cicilan Cepat 3 Bulan',
            'banyak_angsuran' => 3,
            'bunga_persen' => 2.5,
            'denda_flat' => 50000,
        ]);

        PaketKredit::create([
            'nama_paket' => 'Pinjaman Reguler 6 Bulan',
            'banyak_angsuran' => 6,
            'bunga_persen' => 2.0,
            'denda_flat' => 75000,
        ]);

        PaketKredit::create([
            'nama_paket' => 'Kredit Besar 12 Bulan',
            'banyak_angsuran' => 12,
            'bunga_persen' => 1.75,
            'denda_flat' => 100000,
        ]);
    }
}