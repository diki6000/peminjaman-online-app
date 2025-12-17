<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use App\Models\StatusPengguna;


class UserAdminController extends Controller
{
    public function index()
{
    $users = User::select([
        'id',
        'nama_lengkap',
        'email',
        'no_hp',
        'kredit_skor',
        'created_at',
        'updated_at',
        'role_id', // Needed for the 'role' relationship
        'status_pengguna_id', // Needed for the 'statusPengguna' relationship
        // DO NOT include 'nama_ibu_kandung', 'no_ktp', 'no_hp_darurat', 'alamat', 'npwp' here
    ])
    ->with(['role', 'statusPengguna'])
    ->latest()
    ->paginate(15);

    return response()->json($users);
}

    public function updateVerification(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|string|in:VERIFIED,REJECTED',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $pendingStatus = StatusPengguna::where('nama_status', 'PENDING_VERIFICATION')->firstOrFail();
        if ($user->status_pengguna_id !== $pendingStatus->id) {
            return response()->json(['message' => 'This user is not pending verification.'], 422);
        }

        $newStatus = StatusPengguna::where('nama_status', $request->status)->firstOrFail();
        $user->status_pengguna_id = $newStatus->id;
        $user->save();

        return response()->json([
            'message' => 'User verification status has been updated to ' . $request->status,
            'user' => $user->load('statusPengguna') 
        ]);
    }

    /**
     * Display the specified user's full details for the admin.
     */
    public function show(User $user)
    {

        $user->load([
            'role',
            'statusPengguna',
            'rekeningPenggunas.jenisRekening', 
            'pinjamans.statusPinjaman',      
        ]);

        return response()->json($user);
    }
}
