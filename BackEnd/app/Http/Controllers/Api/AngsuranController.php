<?php

namespace App\Http\Controllers\Api;

// ... (all your existing use statements are correct)
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Pinjaman;
use App\Models\Angsuran;
use App\Models\StatusAngsuran;
use App\Models\KanalPembayaran;
use App\Models\HistoriPembayaran;
use App\Models\JenisTransaksi;
use App\Models\StatusPinjaman;

class AngsuranController extends Controller
{
    public function index(Request $request, Pinjaman $pinjaman)
    {
        if ($request->user()->id !== $pinjaman->user_id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $angsurans = $pinjaman->angsurans()->with('statusAngsuran')->get();

        return response()->json($angsurans);
    }

    public function pay(Request $request, Angsuran $angsuran)
    {
        $user = $request->user();
        $pinjaman = $angsuran->pinjaman;

        if ($user->id !== $pinjaman->user_id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        $validator = Validator::make($request->all(), [
            'kanal_pembayaran_id' => 'required|exists:kanal_pembayarans,id,is_active,true',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $paidStatus = StatusAngsuran::where('nama_status', 'LUNAS')->firstOrFail();
        if ($angsuran->status_angsuran_id === $paidStatus->id) {
            return response()->json(['message' => 'This installment has already been paid.'], 422);
        }
        $dueDate = Carbon::parse($angsuran->tanggal_jatuh_tempo);
        $startOfMonth = $dueDate->copy()->startOfMonth();
        $now = Carbon::now();
        if ($now->isBefore($startOfMonth)) {
            return response()->json(['message' => 'Payment for this installment is not yet open.'], 422);
        }

        DB::beginTransaction();
        try {
            $angsuran->status_angsuran_id = $paidStatus->id;
            $angsuran->save();

            $totalPembayaran = $angsuran->jumlah_pokok + $angsuran->jumlah_bunga;

            $isLate = $now->gt($dueDate); 

            if ($isLate) {
                $totalPembayaran += $angsuran->jumlah_denda;
            }

            $pinjaman->sisa_hutang -= $angsuran->jumlah_pokok + $angsuran->jumlah_bunga;
            $pinjaman->save();

            $paymentType = JenisTransaksi::where('nama_jenis', 'PEMBAYARAN_ANGSURAN')->firstOrFail();
            $historiPembayaran = HistoriPembayaran::create([
                'user_id' => $user->id,
                'pinjaman_id' => $pinjaman->id,
                'angsuran_id' => $angsuran->id,
                'jenis_transaksi_id' => $paymentType->id,
                'jumlah_transaksi' => $totalPembayaran,
                'kanal_pembayaran_id' => $request->kanal_pembayaran_id,
                'tanggal_transaksi' => $now,
            ]);

            $historiPembayaran->load('kanalPembayaran');

            $pointsAdded = 0;
            if ($isLate) {
                $points = 5;
                $user->kredit_skor += $points;
                $pointsAdded = $points;
            } else { 
                $points = 10;
                $user->kredit_skor += $points;
                $pointsAdded = $points;
            }
            $user->save();

           $lunasStatusId = StatusAngsuran::where('nama_status', 'LUNAS')->value('id');

            $unpaidInstallmentsCount = $pinjaman->angsurans()
                                                ->where('status_angsuran_id', '!=', $lunasStatusId)
                                                ->count();

            if ($unpaidInstallmentsCount === 0) {
                $finishedStatus = StatusPinjaman::where('nama_status', 'SELESAI')->firstOrFail();
                $pinjaman->status_pinjaman_id = $finishedStatus->id;
                $pinjaman->sisa_hutang = 0;
                $pinjaman->save();
            }


            DB::commit();
            return response()->json([
                'message' => 'Payment for installment ' . $angsuran->angsuran_ke . ' has been successfully recorded.',
                'data' => $pinjaman->load(['angsurans.statusAngsuran', 'paketKredit', 'statusPinjaman']),
                'transaction_history' => $historiPembayaran, 
                'points_added' => $pointsAdded,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Payment processing failed: ' . $e->getMessage());
            return response()->json(['message' => 'Payment processing failed. An internal error occurred.'], 500);
        }
    }
}