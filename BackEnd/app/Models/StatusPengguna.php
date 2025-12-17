<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StatusPengguna extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nama_status',
        'deskripsi',
    ];

    /**
     * Get all of the users that have this status.
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}