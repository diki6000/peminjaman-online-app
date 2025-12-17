<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('paket_kredits', function (Blueprint $table) {
            $table->id();
            $table->string('nama_paket');
            $table->text('deskripsi')->nullable();
            $table->integer('banyak_angsuran');
            $table->decimal('bunga_persen', 5, 2);
            $table->decimal('denda_flat', 15, 2);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paket_kredits');
    }
};
