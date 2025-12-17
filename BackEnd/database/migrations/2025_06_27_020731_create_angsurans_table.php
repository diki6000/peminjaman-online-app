<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('angsurans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pinjaman_id')->constrained('pinjamans')->onDelete('cascade');
            $table->foreignId('status_angsuran_id')->constrained('status_angsurans');
            $table->integer('angsuran_ke');
            $table->decimal('jumlah_pokok', 15, 2);
            $table->decimal('jumlah_bunga', 15, 2);
            $table->decimal('jumlah_denda', 15, 2)->default(0);
            $table->date('tanggal_jatuh_tempo');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('angsurans');
    }
};
