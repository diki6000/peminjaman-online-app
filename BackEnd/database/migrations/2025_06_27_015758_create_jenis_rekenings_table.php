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
        Schema::create('jenis_rekenings', function (Blueprint $table) {
            $table->id();
            $table->string('nama_jenis')->unique(); // e.g., 'BANK', 'EWALLET'
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jenis_rekenings');
    }
};
