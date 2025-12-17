<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rekening_penggunas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('jenis_rekening_id')->constrained('jenis_rekenings');
            $table->string('nama_pemilik_rekening');
            $table->string('nomor_rekening');
            $table->string('nama_provider'); // e.g., 'BCA', 'Mandiri', 'OVO'
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // A user cannot have the same account number twice
            $table->unique(['user_id', 'nomor_rekening']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rekening_penggunas');
    }
};
