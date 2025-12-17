<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\StatusPinjaman;
use App\Models\JenisTransaksi;
use App\Models\HistoriPembayaran;
use Carbon\Carbon;
use App\Models\StatusAngsuran;
use App\Models\Angsuran;
use Illuminate\Support\Facades\DB; 
use App\Models\Pinjaman;

class PinjamanAdminController extends Controller
{
    /**
     * Display a listing of all loan applications for the admin.
     */
    public function index()
    {

        $pinjamans = Pinjaman::with(['user', 'paketKredit', 'statusPinjaman'])
                            ->latest()
                            ->paginate(15); 

        return response()->json($pinjamans);
    }

    public function approveTerms(Request $request, Pinjaman $pinjaman)
    {
        $pendingStatus = StatusPinjaman::where('nama_status', 'PENDING_REVIEW')->firstOrFail();
        if ($pinjaman->status_pinjaman_id !== $pendingStatus->id) {
            return response()->json(['message' => 'This loan is not pending review.'], 422);
        }

        $validator = Validator::make($request->all(), [
            'nominal_disetujui' => 'required|numeric|min:100000',
            'catatan_admin' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $approvedStatus = StatusPinjaman::where('nama_status', 'DISETUJUI')->firstOrFail();

        $pinjaman->status_pinjaman_id = $approvedStatus->id;
        $pinjaman->approved_by_id = $request->user()->id; 
        $pinjaman->tanggal_persetujuan = now();
        $pinjaman->nominal_disetujui = $request->nominal_disetujui; 
        $pinjaman->catatan_admin = $request->catatan_admin;
        $pinjaman->save();

        return response()->json([
            'message' => 'Loan terms have been approved. Waiting for user confirmation.',
            'data' => $pinjaman
        ]);
    }

    public function disburse(Request $request, Pinjaman $pinjaman)
    {
        $rekeningTujuan = $pinjaman->rekeningPengguna;

        if (!$rekeningTujuan) {
            return response()->json(['message' => 'Disbursement failed: No destination account has been set for this loan.'], 422);
        }

        if (!$rekeningTujuan->is_active) {
            return response()->json(['message' => 'Disbursement failed: The destination account is inactive.'], 422);
        }

        $waitingDisbursementStatus = StatusPinjaman::where('nama_status', 'MENUNGGU_PENCAIRAN')->firstOrFail();
        if ($pinjaman->status_pinjaman_id !== $waitingDisbursementStatus->id) {
            return response()->json(['message' => 'This loan is not awaiting disbursement.'], 422);
        }

        DB::beginTransaction();
        try {
            $activeStatus = StatusPinjaman::where('nama_status', 'BERJALAN')->firstOrFail();
            $pinjaman->status_pinjaman_id = $activeStatus->id;
            $pinjaman->tanggal_pencairan_dana = Carbon::now();

            $paket = $pinjaman->paketKredit;
            $nominalPokok = $pinjaman->nominal_disetujui;
            $bungaBulanan = $nominalPokok * ($paket->bunga_persen / 100);
            $totalBunga = $bungaBulanan * $paket->banyak_angsuran;
            $totalHutang = $nominalPokok + $totalBunga;

            $pinjaman->total_hutang = $totalHutang;
            $pinjaman->sisa_hutang = $totalHutang;
            $pinjaman->tanggal_mulai_bayar = Carbon::now()->addMonth()->startOfDay();
            $pinjaman->tanggal_jatuh_tempo_berikutnya = $pinjaman->tanggal_mulai_bayar;
            $pinjaman->save();

            $unpaidStatusAngsuran = StatusAngsuran::where('nama_status', 'BELUM_DIBAYAR')->firstOrFail();
            $angsuranPokokPerBulan = $nominalPokok / $paket->banyak_angsuran;

            for ($i = 1; $i <= $paket->banyak_angsuran; $i++) {
                Angsuran::create([
                    'pinjaman_id' => $pinjaman->id,
                    'status_angsuran_id' => $unpaidStatusAngsuran->id,
                    'angsuran_ke' => $i,
                    'jumlah_pokok' => round($angsuranPokokPerBulan, 2), 
                    'jumlah_bunga' => round($bungaBulanan, 2),
                    'jumlah_denda' => $paket->denda_flat, 
                    'tanggal_jatuh_tempo' => Carbon::now()->addMonths($i)->startOfDay(),
                ]);
            }

            $disbursementType = JenisTransaksi::where('nama_jenis', 'PENCAIRAN_DANA')->firstOrFail();
            HistoriPembayaran::create([
                'user_id' => $pinjaman->user_id,
                'pinjaman_id' => $pinjaman->id,
                'jenis_transaksi_id' => $disbursementType->id,
                'jumlah_transaksi' => $nominalPokok,
                'tanggal_transaksi' => Carbon::now(),
                'catatan' => 'Pencairan dana pinjaman telah dilakukan.',
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Loan has been successfully disbursed and is now active.',
                'data' => $pinjaman->load(['angsurans', 'historiPembayarans'])
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            \Log::error('Loan Disbursement Failed: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to disburse loan. An internal error occurred.'], 500);
        }
    }

    /**
     * Admin rejects a loan application.
     */
    public function reject(Request $request, Pinjaman $pinjaman)
    {
     
        $pendingStatus = StatusPinjaman::where('nama_status', 'PENDING_REVIEW')->firstOrFail();
        if ($pinjaman->status_pinjaman_id !== $pendingStatus->id) {
            return response()->json(['message' => 'This loan is not in a state that can be rejected.'], 422);
        }

        $validator = Validator::make($request->all(), [
            'catatan_admin' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $rejectedStatus = StatusPinjaman::where('nama_status', 'DITOLAK')->firstOrFail();

        $pinjaman->status_pinjaman_id = $rejectedStatus->id;
        $pinjaman->approved_by_id = $request->user()->id; 
        $pinjaman->tanggal_persetujuan = now(); 
        $pinjaman->catatan_admin = $request->catatan_admin;
        $pinjaman->save();

        return response()->json([
            'message' => 'Loan application has been successfully rejected.',
            'data' => $pinjaman
        ]);
    }
}