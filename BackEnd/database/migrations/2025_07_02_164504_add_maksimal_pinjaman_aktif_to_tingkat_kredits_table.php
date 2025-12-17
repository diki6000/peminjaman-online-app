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
        Schema::table('tingkat_kredits', function (Blueprint $table) {
            // This column will control how MANY loans a user can have.
            $table->tinyInteger('maksimal_pinjaman_aktif')
                  ->unsigned()
                  ->default(1)
                  ->after('limit_maksimal');
        });
    }

    public function down(): void
    {
        Schema::table('tingkat_kredits', function (Blueprint $table) {
            $table->dropColumn('maksimal_pinjaman_aktif');
        });
    }
};
