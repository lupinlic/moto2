<?php

namespace App\Http\Controllers;

use App\Models\feedback;
use Illuminate\Http\Request;

class feedbackController extends Controller
{
    //
    public function index()
    {
        //
        $feedback = feedback::with('customer')->get();
        
        return response()->json([
            "message" => "đã lấy danh mục thành công",
            "data" => $feedback,
        ]);
    }
    public function store(Request $request)
    {
        //
        $feedback = feedback::create($request->all());
        return response()->json([
            "message" => "đã tạo danh mục thành công",
            "data" => $feedback,
        ]);
    }
    public function destroy($fbID)
    {
        //
        $feedback = feedback::find($fbID);
        

    if (!$feedback) {
        return response()->json([
            "message" => "Không tìm thấy danh mục cần xóa"
        ], 404);
    }
        $feedback->delete();

        return response()->json([
            "message" => "đã xóa danh mục thành công"
        ]);
    }

}