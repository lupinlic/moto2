<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Đăng ký
    public function register(Request $request)
    {
        $data = $request->all();
    
        // Mã hóa password
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
    
        $user = User::create($data);

        Customer::create([
            'UserID' => $user->id,
            'FullName' => $user->name,
            'PhoneNumber' => '', 
            'Email' => $user->email, 
        ]);
        
        return response()->json([
            "message" => "đã tạo tài khoản thành công",
            "data" => $user,
        ]);
    }

    // Đăng nhập
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Tài khoản hoặc mật khẩu sai'],
            ]);
        }

        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    // Lấy thông tin người dùng
    public function userID(Request $request)
    {
        $userID= $request->user()->UserID();
        return $userID;
    }

    // Đăng xuất
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Đã đăng xuất']);
    }
}