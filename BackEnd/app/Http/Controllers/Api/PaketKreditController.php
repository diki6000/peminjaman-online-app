<?php

namespace App\Http\Controllers\Api;

use App\Models\PaketKredit;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePaketKreditRequest; // <-- Import the new request class
use Illuminate\Http\JsonResponse;

class PaketKreditController extends Controller
{
    /**
     * Display a listing of the resource.
     * Fetches all packages, both active and inactive, for an admin panel.
     */
    public function index(): JsonResponse
    {
        // For an admin panel, you usually want to see everything.
        // We can add filtering later if needed.
        $paketKredits = PaketKredit::orderBy('nama_paket', 'asc')->get();

        return response()->json($paketKredits);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaketKreditRequest $request): JsonResponse
    {
        // The request is already validated by StorePaketKreditRequest
        // The validated() method returns only the data that passed the validation rules.
        $validatedData = $request->validated();

        $paketKredit = PaketKredit::create($validatedData);

        // Return the newly created resource with a 201 Created status code.
        return response()->json($paketKredit, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(PaketKredit $paketKredit): JsonResponse
    {
        // Route-Model binding automatically finds the model or returns a 404.
        return response()->json($paketKredit);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorePaketKreditRequest $request, PaketKredit $paketKredit): JsonResponse
    {
        // We can reuse the same request class for validation.
        $validatedData = $request->validated();

        $paketKredit->update($validatedData);

        // Return the updated resource.
        return response()->json($paketKredit);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaketKredit $paketKredit): JsonResponse
    {
        // Here you have two options:
        // 1. Hard Delete: The record is permanently removed from the database.
        $paketKredit->delete();

        // 2. Soft "Delete" (by making it inactive):
        // $paketKredit->update(['is_active' => false]);

        // We will use a hard delete here and use our separate function for toggling active status.

        // Return a 204 No Content response, which is standard for a successful delete.
        return response()->json(null, 204);
    }

    /**
     * Toggles the active status of a loan package.
     */
    public function toggleActiveStatus(PaketKredit $paketKredit): JsonResponse
    {
        // Flip the boolean value
        $paketKredit->is_active = !$paketKredit->is_active;
        $paketKredit->save();

        return response()->json([
            'message' => 'Status updated successfully.',
            'paket_kredit' => $paketKredit
        ]);
    }
}