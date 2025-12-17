<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; 

use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    // Add HasApiTokens for Sanctum
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'nama_lengkap',
        'email',
        'no_hp',
        'password',
        'nama_ibu_kandung',
        'no_ktp',
        'no_hp_darurat',
        'alamat',
        'npwp',
        'role_id',
        'status_pengguna_id',
        'limit_pinjaman',
        'kredit_skor',
    ];

    /**
     * The attributes that should be hidden for serialization.
     * These will not be sent back in API responses.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    /**
     * Define the relationship to the Role model.
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Define the relationship to the StatusPengguna model.
     */
    public function statusPengguna()
    {
        return $this->belongsTo(StatusPengguna::class);
    }
    

    public function pinjamans()
    {
        return $this->hasMany(Pinjaman::class);
    }

    /**
     * A special relationship to get the user's credit tier based on their score.
     * This is an Accessor, not a standard relationship. Very useful!
     */
    public function getTingkatKreditAttribute()
    {
        // Find the highest tier that the user qualifies for.
        return TingkatKredit::where('skor_minimal', '<=', $this->kredit_skor)
                            ->orderBy('skor_minimal', 'desc')
                            ->first();
    }

    public function rekeningPenggunas(): HasMany
    {
        return $this->hasMany(RekeningPengguna::class);
    }
}