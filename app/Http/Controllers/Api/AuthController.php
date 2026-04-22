<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where("email", $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                "message" => "Invalid credentials",
            ], 422);
        }

        $token = $user->createToken('admin-token')->plainTextToken;

       return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }

    public function logout(LoginRequest $request): JsonResponse
    {
        $user = $request->user()->currentAccessToken()?->delete();

        return response()->json([
            "message" => "Logout successful",
        ]);
    }
}
