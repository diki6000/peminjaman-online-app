<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JenisRekening;
use Illuminate\Http\Request;

class JenisRekeningController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(JenisRekening::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(JenisRekening $jenisRekening)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JenisRekening $jenisRekening)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JenisRekening $jenisRekening)
    {
        //
    }
}
