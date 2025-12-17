<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StatusPinjaman extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     * Laravel would guess 'status_pinjamans' (plural), so we must specify the singular name.
     *
     * @var string
     */
    protected $table = 'status_pinjaman';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nama_status',
    ];

    /**
     * Get all of the loans (pinjamans) that have this status.
     */
    public function pinjamans(): HasMany
    {
        return $this->hasMany(Pinjaman::class);
    }
}