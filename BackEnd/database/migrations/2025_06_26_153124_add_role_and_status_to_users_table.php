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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->after('npwp')->constrained('roles');
            // This now correctly points to the plural table name
            $table->foreignId('status_pengguna_id')->after('role_id')->constrained('status_penggunas');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // This is good practice for reversing the migration
            $table->dropForeign(['role_id']);
            $table->dropForeign(['status_pengguna_id']);
            $table->dropColumn(['role_id', 'status_pengguna_id']);
        });
    }
};
