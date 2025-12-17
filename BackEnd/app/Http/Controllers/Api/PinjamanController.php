<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller; 

use App\Models\Pinjaman;
use App\Models\PaketKredit;
use App\Models\TingkatKredit;
use App\Models\StatusPinjaman;
use App\Models\StatusPengguna;



class PinjamanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $pinjamans = $user->pinjamans() 
                         ->with(['paketKredit', 'statusPinjaman']) 
                         ->latest() 
                         ->paginate(10);

        return response()->json($pinjamans);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
     // In: app/Http/Controllers/Api/PinjamanController.php

    public function store(Request $request)
    {
        $user = $request->user();

        $verifiedStatus = StatusPengguna::where('nama_status', 'VERIFIED')->first();
        if ($user->status_pengguna_id !== $verifiedStatus->id) {
            return response()->json(['message' => 'Your account is not verified for loans.'], 403);
        }
        $tingkatKredit = TingkatKredit::where('skor_minimal', '<=', $user->kredit_skor)
                                    ->orderBy('skor_minimal', 'desc')
                                    ->first();

        if (!$tingkatKredit) {
            return response()->json(['message' => 'Could not determine your credit tier.'], 422);
        }

        $activeStatuses = StatusPinjaman::whereIn('nama_status', [
            'PENDING_REVIEW', 
            'DISETUJUI', 
            'MENUNGGU_PENCAIRAN',
            'BERJALAN',
            'MACET'
        ])->pluck('id');

        $activeLoanCount = $user->pinjamans()->whereIn('status_pinjaman_id', $activeStatuses)->count();

        $maxActiveLoans = $tingkatKredit->maksimal_pinjaman_aktif; 

        if ($activeLoanCount >= $maxActiveLoans) {
            return response()->json([
                'message' => 'You have reached the limit of ' . $maxActiveLoans . ' active loan(s) for your tier.'
            ], 422);
        }

        $validator = Validator::make($request->all(), [
            'paket_kredit_id' => 'required|exists:paket_kredits,id',
            'nominal_pinjaman' => 'required|numeric|min:100000',
            'tujuan_pinjaman' => 'required|string|max:500',
            'rekening_pengguna_id' => 'required|exists:rekening_penggunas,id,user_id,' . $user->id,
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        
        $limitMaksimal = $tingkatKredit->limit_maksimal;
        if ($request->nominal_pinjaman > $limitMaksimal) {
            return response()->json([
                'message' => 'The requested loan amount exceeds your credit limit of ' . number_format($limitMaksimal) . '.'
            ], 422);
        }

        $pendingStatus = StatusPinjaman::where('nama_status', 'PENDING_REVIEW')->first();

        $pinjaman = Pinjaman::create([
            'user_id' => $user->id,
            'paket_kredit_id' => $request->paket_kredit_id,
            'status_pinjaman_id' => $pendingStatus->id,
            'tujuan_pinjaman' => $request->tujuan_pinjaman,
            'rekening_pengguna_id' => $request->rekening_pengguna_id,
            
            'nominal_pinjaman' => $request->nominal_pinjaman, 
            
            'nominal_disetujui' => $request->nominal_pinjaman,
        ]);

        return response()->json([
            'message' => 'Your loan application has been submitted successfully.',
            'data' => $pinjaman
        ], 201);
    }


    /**
     * Display the specified resource.
     */
     public function show(Request $request, Pinjaman $pinjaman)
    {
        if ($request->user()->id !== $pinjaman->user_id) {
            abort(403, 'This action is unauthorized.');
        }

        return response()->json(
            $pinjaman->load([
                'user',
                'paketKredit',
                'statusPinjaman',
                'rekeningPengguna.jenisRekening', 
                'angsurans.statusAngsuran',
                'historiPembayarans.jenisTransaksi',
                'approver' 
            ])
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pinjaman $pinjaman)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pinjaman $pinjaman)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pinjaman $pinjaman)
    {
        //
    }

    public function acceptOffer(Request $request, Pinjaman $pinjaman)
    {
        // --- 1. Authorization Check ---
        if ($request->user()->id !== $pinjaman->user_id) {
            return response()->json(['message' => 'Forbidden: You are not the owner of this loan.'], 403);
        }

        // --- 2. Validation ---
        $approvedStatus = StatusPinjaman::where('nama_status', 'DISETUJUI')->firstOrFail();
        if ($pinjaman->status_pinjaman_id !== $approvedStatus->id) {
            return response()->json(['message' => 'This loan offer is not in an acceptable state.'], 422);
        }

        // --- 3. Update Status ---
        $waitingDisbursementStatus = StatusPinjaman::where('nama_status', 'MENUNGGU_PENCAIRAN')->firstOrFail();
        $pinjaman->status_pinjaman_id = $waitingDisbursementStatus->id;
        $pinjaman->save();

        // --- 4. Return Success Response ---
        return response()->json([
            'message' => 'Loan offer accepted. Please wait for funds to be disbursed.',
            'data' => $pinjaman
        ]);
    }

    public function cancelOffer(Request $request, Pinjaman $pinjaman)
    {
        // --- 1. Authorization Check ---
        if ($request->user()->id !== $pinjaman->user_id) {
            return response()->json(['message' => 'Forbidden: You are not the owner of this loan.'], 403);
        }

        // --- 2. Validation ---
        $approvedStatus = StatusPinjaman::where('nama_status', 'DISETUJUI')->firstOrFail();
        if ($pinjaman->status_pinjaman_id !== $approvedStatus->id) {
            return response()->json(['message' => 'This loan offer cannot be cancelled at this stage.'], 422);
        }

        // --- 3. Update Status ---
        $cancelledStatus = StatusPinjaman::where('nama_status', 'DIBATALKAN')->firstOrFail();
        $pinjaman->status_pinjaman_id = $cancelledStatus->id;
        $pinjaman->save();

        // --- 4. Return Success Response ---
        return response()->json([
            'message' => 'Loan offer has been successfully cancelled.',
            'data' => $pinjaman
        ]);
    }
}
