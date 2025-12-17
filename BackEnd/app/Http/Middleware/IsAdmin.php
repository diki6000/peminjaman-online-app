<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && $request->user()->role->nama_role === 'ADMIN') {
            // If they are an admin, allow the request to proceed
            return $next($request);
        }

        // If not, block the request with a 'Forbidden' error
        return response()->json(['message' => 'Forbidden: This action requires admin privileges.'], 403);
    }
}
