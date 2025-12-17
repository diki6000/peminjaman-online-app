<?php

namespace App\Http\Controllers\Api;

use App\Models\RekeningPengguna;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 
use App\Models\JenisRekening;
use Illuminate\Support\Facades\Validator;
use App\Models\StatusPinjaman;
use App\Models\Pinjaman;

class RekeningPenggunaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $rekenings = $request->user()->rekeningPenggunas()->with('jenisRekening')->get();

        return response()->json($rekenings);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'jenis_rekening_id' => 'required|exists:jenis_rekenings,id',
            'nama_pemilik_rekening' => 'required|string|max:255',
            'nomor_rekening' => 'required|string|max:50|unique:rekening_penggunas,nomor_rekening,NULL,id,user_id,' . $request->user()->id,
            'nama_provider' => 'required|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $rekening = $request->user()->rekeningPenggunas()->create($request->all());

        return response()->json([
            'message' => 'Rekening berhasil ditambahkan.',
            'data' => $rekening
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(RekeningPengguna $rekeningPengguna)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RekeningPengguna $rekeningPengguna)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RekeningPengguna $rekeningPengguna)
    {
        if ($request->user()->id !== $rekeningPengguna->user_id) {
            return response()->json(['message' => 'Forbidden: You do not own this account.'], 403);
        }

        $validator = Validator::make($request->all(), [
            'jenis_rekening_id' => 'sometimes|required|exists:jenis_rekenings,id',
            'nama_pemilik_rekening' => 'sometimes|required|string|max:255',
            'nama_provider' => 'sometimes|required|string|max:100',
            'is_active' => 'sometimes|required|boolean',
            'nomor_rekening' => 'sometimes|required|string|max:50|unique:rekening_penggunas,nomor_rekening,' . $rekeningPengguna->id . ',id,user_id,' . $request->user()->id,
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $rekeningPengguna->update($request->all());

        return response()->json([
            'message' => 'Rekening berhasil diperbarui.',
            'data' => $rekeningPengguna
        ]);
    }

        /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, RekeningPengguna $rekeningPengguna)
    {
        if ($request->user()->id !== $rekeningPengguna->user_id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $isUsedInAnyLoan = Pinjaman::where('rekening_pengguna_id', $rekeningPengguna->id)->exists();

        if ($isUsedInAnyLoan) {
  
            $rekeningPengguna->is_active = false;
            $rekeningPengguna->save();

            return response()->json([
                'message' => 'This account cannot be deleted because it is tied to your loan history. It has been deactivated instead.'
            ]);
        }

        $rekeningPengguna->delete();

        return response()->json(['message' => 'Rekening berhasil dihapus.'], 200);
    }
}
