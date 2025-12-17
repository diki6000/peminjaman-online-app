<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JenisRekening extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * @var array<int, string>
     */
    protected $fillable = [
        'nama_jenis',
    ];

    /**
     * Get all of the payment history records for this transaction type.
     */
    public function historiPembayarans(): HasMany
    {
        return $this->hasMany(HistoriPembayaran::class);
    }
}