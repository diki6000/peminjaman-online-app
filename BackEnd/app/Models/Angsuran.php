<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Angsuran extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * @var array<int, string>
     */
    protected $fillable = [
        'pinjaman_id',
        'status_angsuran_id',
        'angsuran_ke',
        'jumlah_pokok',
        'jumlah_bunga',
        'jumlah_denda',
        'jumlah_denda',
        'tanggal_jatuh_tempo',
    ];

    /**
     * Get the loan that this installment belongs to.
     */
    public function pinjaman(): BelongsTo
    {
        return $this->belongsTo(Pinjaman::class);
    }

    /**
     * Get the status of this installment.
     */
    public function statusAngsuran(): BelongsTo
    {
        return $this->belongsTo(StatusAngsuran::class);
    }
}