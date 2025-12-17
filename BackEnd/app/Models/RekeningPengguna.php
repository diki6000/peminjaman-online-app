<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RekeningPengguna extends Model
{
    /** @use HasFactory<\Database\Factories\RekeningPenggunaFactory> */
    use HasFactory;
    protected $table = 'rekening_penggunas';

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'jenis_rekening_id',
        'nama_pemilik_rekening',
        'nomor_rekening',
        'nama_provider',
        'is_active', // It's good practice to include this even if it has a default
    ];

    /**
     * Get the user that owns this bank account.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the type of this bank account (BANK/EWALLET).
     */
    public function jenisRekening(): BelongsTo // Now PHP knows what 'BelongsTo' is
    {
        return $this->belongsTo(JenisRekening::class);
    }


    
}
