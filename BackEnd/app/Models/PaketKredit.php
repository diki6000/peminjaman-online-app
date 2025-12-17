<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PaketKredit extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nama_paket',
        'deskripsi',
        'banyak_angsuran',
        'bunga_persen',
        'denda_flat',
        'is_active',
    ];

    /**
     * Get all of the loans (pinjamans) for this loan package.
     */
    public function pinjamans(): HasMany
    {
        return $this->hasMany(Pinjaman::class);
    }
}