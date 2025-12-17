<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jenis_transaksis', function (Blueprint $table) {
            $table->id();
            $table->string('nama_jenis')->unique(); // e.g., 'PENCAIRAN_DANA', 'PEMBAYARAN_ANGSURAN'
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jenis_transaksis');
    }
};
