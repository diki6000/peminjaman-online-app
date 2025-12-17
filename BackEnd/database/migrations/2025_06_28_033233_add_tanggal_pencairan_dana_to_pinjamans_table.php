<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pinjamans', function (Blueprint $table) {
            // Add the new column, placing it after 'tanggal_persetujuan' for organization
            $table->timestamp('tanggal_pencairan_dana')->nullable()->after('tanggal_persetujuan');
        });
    }

    public function down(): void
    {
        Schema::table('pinjamans', function (Blueprint $table) {
            // This allows you to reverse the migration if needed
            $table->dropColumn('tanggal_pencairan_dana');
        });
    }
};