<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('histori_pembayarans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('pinjaman_id')->constrained('pinjamans');
            $table->foreignId('jenis_transaksi_id')->constrained('jenis_transaksis');

            // An installment payment is linked to a specific installment.
            // A loan disbursement is not. So this is nullable.
            $table->foreignId('angsuran_id')->nullable()->constrained('angsurans');

            $table->decimal('jumlah_transaksi', 15, 2);

            // Which company channel was used for this transaction?
            $table->foreignId('kanal_pembayaran_id')->nullable()->constrained('kanal_pembayarans');

            $table->string('referensi_eksternal')->nullable()->comment('External transaction ID from payment gateway');
            $table->timestamp('tanggal_transaksi');
            $table->text('catatan')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('histori_pembayarans');
    }
};
