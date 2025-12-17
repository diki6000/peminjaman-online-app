<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // In database/migrations/2014_10_12_000000_create_users_table.php
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            // --- Core User Info (for login & display) ---
            // MODIFIED: 'name' becomes 'nama_lengkap' for clarity
            $table->string('nama_lengkap');
            $table->string('email')->unique();
            $table->string('no_hp')->unique();
            $table->string('password');

            // --- Verification Data (nullable, filled in later) ---
            $table->string('nama_ibu_kandung')->nullable();
            $table->string('no_ktp')->nullable()->unique();
            $table->string('no_hp_darurat')->nullable();
            $table->text('alamat')->nullable();
            $table->string('npwp')->nullable()->unique();

            // --- Foreign Keys (The "Best Practice" part) ---
            // We can't add these lines yet, because the other migration files
            // that create 'roles' and 'status_pengguna' will run AFTER this one.
            // We will add these in a NEW migration file.

            // --- Financial Info ---
            $table->decimal('limit_pinjaman', 15, 2)->default(0);
            $table->integer('kredit_skor')->default(0);

        $table->rememberToken();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
