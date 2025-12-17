<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Pinjaman extends Model
{
    use HasFactory;

     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'pinjamans'; // <-- ADD THIS LINE
    protected $with = ['user', 'paketKredit', 'statusPinjaman', 'rekeningPengguna.jenisRekening'];

    /**
     * The attributes that are mass assignable.
     *
     * These are the fields that can be filled when creating a new loan application.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'paket_kredit_id',
        'status_pinjaman_id',
        'nominal_disetujui',
        'tujuan_pinjaman',
        'nominal_pinjaman', 
        'approved_by_id',
        'catatan_admin',
        'total_hutang',
        'sisa_hutang',
        'tanggal_mulai_bayar',
        'tanggal_jatuh_tempo_berikutnya',
        'rekening_pengguna_id',
    ];


    /**
     * The user who applied for this loan.
     */
    public function user(): BelongsTo // Now this correctly refers to the imported class
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The loan package this loan is based on.
     */
    public function paketKredit(): BelongsTo // Correct
    {
        return $this->belongsTo(PaketKredit::class);
    }

    /**
     * The current status of this loan.
     */
    public function statusPinjaman(): BelongsTo // Correct
    {
        return $this->belongsTo(StatusPinjaman::class);
    }

    /**
     * The admin user who approved this loan.
     */
    public function approver(): BelongsTo // Correct
    {
        return $this->belongsTo(User::class, 'approved_by_id');
    }

    /**
     * The destination account for the loan disbursement.
     */
    public function rekeningPengguna(): BelongsTo // Correct
    {
        return $this->belongsTo(RekeningPengguna::class);
    }

    /**
     * The generated installment schedule for this loan.
     */
    public function angsurans(): HasMany // Example for HasMany
    {
        return $this->hasMany(Angsuran::class);
    }

    /**
     * The transaction history for this loan.
     */
    public function historiPembayarans(): HasMany // Example for HasMany
    {
        return $this->hasMany(HistoriPembayaran::class);
    }
}