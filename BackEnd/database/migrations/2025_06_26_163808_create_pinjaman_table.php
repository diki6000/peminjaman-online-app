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
        Schema::create('pinjamans', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('paket_kredit_id')->constrained('paket_kredits');
            $table->foreignId('status_pinjaman_id')->constrained('status_pinjaman');

            $table->decimal('nominal_disetujui', 15, 2);
            $table->text('tujuan_pinjaman')->nullable();

            $table->decimal('total_hutang', 15, 2)->default(0);
            $table->decimal('sisa_hutang', 15, 2)->default(0);
            $table->date('tanggal_mulai_bayar')->nullable();
            $table->date('tanggal_jatuh_tempo_berikutnya')->nullable();
            $table->timestamp('tanggal_persetujuan')->nullable()->after('approved_by_id');

            $table->foreignId('approved_by_id')->nullable()->constrained('users');
            $table->text('catatan_admin')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pinjamans');
    }
};
