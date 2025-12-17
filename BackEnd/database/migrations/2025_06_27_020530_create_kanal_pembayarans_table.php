<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kanal_pembayarans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jenis_rekening_id')->constrained('jenis_rekenings');
            $table->string('nama_kanal'); // e.g., 'BCA Virtual Account', 'OVO Official'
            $table->string('nama_pemilik_rekening');
            $table->string('nomor_rekening')->unique();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kanal_pembayarans');
    }
};
