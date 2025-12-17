<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; 
use Illuminate\Support\Facades\Hash;      
use Illuminate\Support\Facades\Auth;
use App\Models\User;                      
use App\Models\Role;                      
use App\Models\StatusPengguna;             


class AuthController extends Controller
{


    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Attempt to authenticate the user
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Authentication was successful, get the user
        $user = Auth::user();
        $token = $user->createToken('auth-token')->plainTextToken;

        // Return a consistent response for ALL successful logins
        return response()->json([
            'message'      => 'Login successful!',
            'access_token' => $token,
            'token_type'   => 'Bearer',
            // CRUCIAL: Return the user object with its role loaded
            'user'         => $user->load('role'), 
        ]);
    }
    
    public function user(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'user' => $user->load(['role', 'statusPengguna'])
        ]);
    }

    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'nama_lengkap' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'no_hp' => 'required|string|max:15|unique:users',
            'password' => 'required|string|min:8|confirmed', 
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $userRoleId = Role::where('nama_role', 'USER')->first()->id;
        $unverifiedStatusId = StatusPengguna::where('nama_status', 'UNVERIFIED')->first()->id;

        $user = User::create([
            'nama_lengkap' => $request->nama_lengkap,
            'email' => $request->email,
            'no_hp' => $request->no_hp,
            'password' => Hash::make($request->password), 
            'role_id' => $userRoleId,
            'status_pengguna_id' => $unverifiedStatusId,
            'kredit_skor' => 250,

        ]);

        return response()->json([
            'message' => 'Registration successful!',
        ], 201); 
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        $user->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out.'
        ], 200);
    }

    public function delete(Request $request)
    {
        $user = $request->user();

        $user->tokens()->delete();

        $user->delete();

        return response()->json([
            'message' => 'Your account has been successfully deleted.'
        ], 200); 
    }

    public function adminLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials.'], 401);
        }

        $user = $request->user();

        // Crucial: Check if the authenticated user has the 'ADMIN' role
        if ($user->role->nama_role !== 'ADMIN') { // Assuming 'role' relationship is loaded
            Auth::logout(); // Log them out immediately if not admin
            return response()->json(['message' => 'Unauthorized. Not an admin.'], 403);
        }

        $token = $user->createToken('admin-auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Admin logged in successfully.',
            'user' => $user->load('role'), // Load role to send to frontend
            'token' => $token
        ]);
    }

}