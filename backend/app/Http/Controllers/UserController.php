<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $user = User::all();
        
        return response()->json([
            "message" => "đã lấy danh mục thành công",
            "data" => $user,
        ]);
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
        //
        $feedback = User::create($request->all());
        return response()->json([
            "message" => "đã tạo danh mục thành công",
            "data" => $feedback,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($UserID)
    {
        //
        $user = User::find($UserID); // Tìm theo CategoryID

        if (!$user) {
            return response()->json([
                "message" => "Không tìm thấy danh mục",
                "data" => null
            ], 404);
        }
    
        return response()->json([
            "message" => "Hiển thị danh mục thành công",
            "data" => $user,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,$UserID)
    {
        //
        $category = User::find($UserID);
        if (!$category) {
            return response()->json([
                "message" => "Không tìm thấy danh mục",
                "data" => null
            ], 404);
        }
    
        // Cập nhật dữ liệu
        $category->update($request->all());
    
        return response()->json([
            "message" => "Đã sửa danh mục thành công",
            "data" => $category,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($fbID)
    {
        //
        $user = User::find($fbID);
        

    if (!$user) {
        return response()->json([
            "message" => "Không tìm thấy danh mục cần xóa"
        ], 404);
    }
        $user->delete();

        return response()->json([
            "message" => "đã xóa danh mục thành công"
        ]);
    }
    public function changePassword(Request $request){
        $user = User::find($request->id);
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Mật khẩu hiện tại không đúng'], 403);
        }
    
        $user->password = Hash::make($request->new_password);
        $user->save();
    
        return response()->json(['message' => 'Đổi mật khẩu thành công']);
    }
}