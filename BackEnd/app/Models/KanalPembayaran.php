<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KanalPembayaran extends Model
{
    use HasFactory;
    
    protected $with = ['jenisRekening'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'jenis_rekening_id',
        'nama_kanal',
        'nama_pemilik_rekening',
        'nomor_rekening',
        'is_active',
    ];

    /**
     * Get the type of rekening associated with the payment channel.
     */
    public function jenisRekening(): BelongsTo
    {
        return $this->belongsTo(JenisRekening::class);
    }
}