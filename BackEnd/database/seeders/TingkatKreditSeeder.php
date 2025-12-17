<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\TingkatKredit;

class TingkatKreditSeeder extends Seeder
{
    public function run(): void
    {
        TingkatKredit::create(['nama_tingkat' => 'Bronze', 'skor_minimal' => 0, 'limit_maksimal' => 1000000]);
        TingkatKredit::create(['nama_tingkat' => 'Silver', 'skor_minimal' => 300, 'limit_maksimal' => 5000000]);
        TingkatKredit::create(['nama_tingkat' => 'Gold', 'skor_minimal' => 600, 'limit_maksimal' => 20000000]);
    }
}