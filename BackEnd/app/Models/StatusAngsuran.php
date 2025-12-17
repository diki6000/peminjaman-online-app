<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StatusAngsuran extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * @var array<int, string>
     */
    protected $fillable = [
        'nama_status',
        'deskripsi',
    ];

    /**
     * Get all of the angsurans for this status.
     */
    public function angsurans(): HasMany
    {
        return $this->hasMany(Angsuran::class);
    }
}