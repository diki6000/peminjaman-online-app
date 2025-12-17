<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AngsuranController;
use App\Http\Controllers\Api\AccountController;
use App\Http\Controllers\Api\PaketKreditController;
use App\Http\Controllers\Api\PinjamanController;
use App\Http\Controllers\Api\PinjamanAdminController;
use App\Http\Controllers\Api\RekeningPenggunaController;
use App\Http\Controllers\Api\UserAdminController;
use App\Http\Controllers\Api\KanalPembayaranController;
use App\Http\Controllers\Api\JenisRekeningController;
use App\Models\Angsuran;


// --- 1. PUBLIC ROUTES ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/ping', fn() => response()->json(['message' => 'pong'])); // Simplified ping route
Route::post('/admin/login', [AuthController::class, 'adminLogin']);

Route::middleware('auth:api')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::delete('/user', [AuthController::class, 'delete']);

    Route::get('/user/kredit-info', [AccountController::class, 'kreditInfo']);
    Route::post('/user/submit-verification', [AccountController::class, 'submitVerification']);
    Route::patch('/user/profile', [AccountController::class, 'updateProfile']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::apiResource('rekening-pengguna', RekeningPenggunaController::class);

    Route::get('/paket-kredit', [PaketKreditController::class, 'index']);
    Route::get('/paket-kredit/{paketKredit}', [PaketKreditController::class, 'show']);

    Route::get('/pinjamans', [PinjamanController::class, 'index']); 
    Route::get('/pinjamans/{pinjaman}', [PinjamanController::class, 'show']); 
    Route::post('/pinjamans', [PinjamanController::class, 'store']);

    Route::patch('/pinjamans/{pinjaman}/accept-offer', [PinjamanController::class, 'acceptOffer']);
    Route::patch('/pinjamans/{pinjaman}/cancel-offer', [PinjamanController::class, 'cancelOffer']);

    Route::get('/pinjamans/{pinjaman}/angsurans', [AngsuranController::class, 'index']);
    Route::post('/angsurans/{angsuran}/pay', [AngsuranController::class, 'pay']);

    Route::get('/kanal-pembayarans', [KanalPembayaranController::class, 'index']);

    Route::get('/jenis-rekenings', [JenisRekeningController::class, 'index']);

});

Route::middleware(['auth:api', 'admin'])->prefix('admin')->group(function() {
    Route::get('/pinjamans', [PinjamanAdminController::class, 'index']);
    Route::patch('/pinjamans/{pinjaman}/approve-terms', [PinjamanAdminController::class, 'approveTerms']);
    Route::patch('/pinjamans/{pinjaman}/reject', [PinjamanAdminController::class, 'reject']);
    Route::patch('/pinjamans/{pinjaman}/disburse', [PinjamanAdminController::class, 'disburse']);

    Route::get('/users', [UserAdminController::class, 'index']);
    Route::get('/users/{user}', [UserAdminController::class, 'show']);
    Route::patch('/users/{user}/update-verification', [UserAdminController::class, 'updateVerification']);
    
    Route::apiResource('paket-kredit', PaketKreditController::class);

    Route::patch('paket-kredit/{paketKredit}/toggle-active', [PaketKreditController::class, 'toggleActiveStatus'])
        ->name('admin.paket-kredit.toggle-active');

    Route::apiResource('kanal-pembayaran', KanalPembayaranController::class);
    Route::patch('kanal-pembayaran/{kanalPembayaran}/toggle-active', [KanalPembayaranController::class, 'toggleActiveStatus'])
        ->name('admin.kanal-pembayaran.toggle-active');

});