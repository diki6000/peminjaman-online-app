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
        Schema::create('status_penggunas', function (Blueprint $table) {
            $table->id();
            $table->string('nama_status')->unique(); // "UNVERIFIED", "PENDING_VERIFICATION", etc.
            $table->string('deskripsi')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('status_penggunas');
    }
};
