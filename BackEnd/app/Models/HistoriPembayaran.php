<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HistoriPembayaran extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'pinjaman_id',
        'jenis_transaksi_id',
        'angsuran_id',
        'jumlah_transaksi',
        'kanal_pembayaran_id',
        'referensi_eksternal',
        'tanggal_transaksi',
        'catatan',
    ];

    /**
     * Get the user associated with this transaction.
     */
    public function kanalPembayaran()
    {
        // A HistoriPembayaran "belongs to" one KanalPembayaran.
        // The foreign key is 'kanal_pembayaran_id'.
        return $this->belongsTo(KanalPembayaran::class, 'kanal_pembayaran_id');
    }
    
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the loan associated with this transaction.
     */
    public function pinjaman(): BelongsTo
    {
        return $this->belongsTo(Pinjaman::class);
    }

    /**
     * Get the installment this payment was for (can be null).
     */
    public function angsuran(): BelongsTo
    {
        return $this->belongsTo(Angsuran::class);
    }

    /**
     * Get the type of transaction.
     */
    public function jenisTransaksi(): BelongsTo
    {
        return $this->belongsTo(JenisTransaksi::class);
    }
}