<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TingkatKredit;
use App\Models\StatusPengguna;
use Illuminate\Support\Facades\Validator;
// Make sure to import the User model if it's not already, though it's used implicitly
// use App\Models\User; 


class AccountController extends Controller
{
    public function kreditInfo(Request $request)
    {
        $user = $request->user();
        $userKreditSkor = $user->kredit_skor;

        $tingkatKredit = TingkatKredit::where('skor_minimal', '<=', $userKreditSkor)
                                    ->orderBy('skor_minimal', 'desc')
                                    ->first();

        $response = [
            'kredit_skor' => $userKreditSkor,
            'limit_pinjaman_maksimal' => 0,
            'nama_tingkat_kredit' => 'Tidak Terdefinisi',
            'maksimal_pinjaman_aktif' => 0, 
        ];

        if ($tingkatKredit) {
            $response['limit_pinjaman_maksimal'] = $tingkatKredit->limit_maksimal;
            $response['nama_tingkat_kredit'] = $tingkatKredit->nama_tingkat;
            $response['maksimal_pinjaman_aktif'] = $tingkatKredit->maksimal_pinjaman_aktif;
        }

        return response()->json($response);
    }

    public function submitVerification(Request $request)
    {
        $user = $request->user();

        // --- FIX 1: Allow UNVERIFIED or REJECTED users to submit ---
        $allowedStatusIds = StatusPengguna::whereIn('nama_status', ['UNVERIFIED', 'REJECTED'])->pluck('id')->toArray();
        
        if (!in_array($user->status_pengguna_id, $allowedStatusIds)) {
            // Provide a more informative message if they are in PENDING or VERIFIED status
            $currentStatusName = $user->statusPengguna ? $user->statusPengguna->nama_status : 'Unknown';
            return response()->json([
                'message' => 'Your account status (' . $currentStatusName . ') does not allow for verification submission at this time.'
            ], 422);
        }

        // --- FIX 2: Adjust unique validation rules to ignore the current user's ID ---
        $validator = Validator::make($request->all(), [
            'nama_ibu_kandung' => 'required|string|max:255',
            'no_ktp' => 'required|string|digits:16|unique:users,no_ktp,' . $user->id, // Add ',user_id' to ignore current user
            'no_hp_darurat' => 'required|string|max:15',
            'alamat' => 'required|string|max:1000',
            'npwp' => 'nullable|string|digits_between:15,16|unique:users,npwp,' . $user->id, // Add ',user_id' to ignore current user
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $pendingStatus = StatusPengguna::where('nama_status', 'PENDING_VERIFICATION')->firstOrFail();

        $user->update([
            'nama_ibu_kandung' => $request->nama_ibu_kandung,
            'no_ktp' => $request->no_ktp,
            'no_hp_darurat' => $request->no_hp_darurat,
            'alamat' => $request->alamat,
            'npwp' => $request->npwp,
            'status_pengguna_id' => $pendingStatus->id, 
        ]);

        // It's good practice to load the updated status_pengguna relationship before returning
        return response()->json([
            'message' => 'Verification data submitted successfully. Please wait for admin review.',
            'user' => $user->load('statusPengguna') 
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'nama_lengkap' => 'sometimes|required|string|max:255',
            'no_hp' => 'sometimes|required|string|max:15',
            'email' => 'sometimes|required|email|max:255|unique:users,email,' . $user->id,
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user->update(
            $request->only(['nama_lengkap', 'email', 'no_hp'])
        );

        return response()->json([
            'message' => 'Your profile has been successfully updated.',
            'user' => $user
        ]);
    }
}