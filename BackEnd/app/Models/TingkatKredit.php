<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TingkatKredit extends Model
{
    /** @use HasFactory<\Database\Factories\TingkatKreditFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nama_tingkat',
        'skor_minimal',
        'limit_maksimal',
    ];
}
