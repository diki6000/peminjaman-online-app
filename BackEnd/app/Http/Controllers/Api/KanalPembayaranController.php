<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\KanalPembayaran;
use App\Http\Requests\StoreKanalPembayaranRequest; // <-- Import request
use Illuminate\Http\JsonResponse;

class KanalPembayaranController extends Controller
{
    /**
     * Display a listing of the resource for the admin panel (all channels).
     */
    public function index(): JsonResponse
    {
        // For an admin panel, we show all channels, not just active ones.
        // The `$with` property on the model handles including 'jenisRekening'.
        $kanals = KanalPembayaran::orderBy('nama_kanal', 'asc')->get();

        return response()->json($kanals);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreKanalPembayaranRequest $request): JsonResponse
    {
        $kanal = KanalPembayaran::create($request->validated());
        return response()->json($kanal, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(KanalPembayaran $kanalPembayaran): JsonResponse
    {
        return response()->json($kanalPembayaran);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreKanalPembayaranRequest $request, KanalPembayaran $kanalPembayaran): JsonResponse
    {
        $kanalPembayaran->update($request->validated());
        return response()->json($kanalPembayaran);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KanalPembayaran $kanalPembayaran): JsonResponse
    {
        $kanalPembayaran->delete();
        return response()->json(null, 204);
    }

    /**
     * Toggles the active status of a payment channel.
     */
    public function toggleActiveStatus(KanalPembayaran $kanalPembayaran): JsonResponse
    {
        $kanalPembayaran->is_active = !$kanalPembayaran->is_active;
        $kanalPembayaran->save();

        return response()->json([
            'message' => 'Status updated successfully.',
            'kanal_pembayaran' => $kanalPembayaran
        ]);
    }
}