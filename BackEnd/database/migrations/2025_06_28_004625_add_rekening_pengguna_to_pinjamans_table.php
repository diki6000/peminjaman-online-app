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
        Schema::table('pinjamans', function (Blueprint $table) {
            // The account where the funds will be disbursed.
            // It's nullable because it's not known when the application is first created.
            // It can be constrained to the rekening_penggunas table.
            $table->foreignId('rekening_pengguna_id')->nullable()->after('user_id')->constrained('rekening_penggunas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pinjamans', function (Blueprint $table) {
            //
        });
    }
};
