<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    //
    public function index()
    {
        //
        $feedback = News::all();
        
        return response()->json([
            "message" => "đã lấy danh mục thành công",
            "data" => $feedback,
        ]);
    }
    public function store(Request $request)
    {
        //
        $feedback = News::create($request->all());
        return response()->json([
            "message" => "đã tạo danh mục thành công",
            "data" => $feedback,
        ]);
    }
    public function update(Request $request,$CategoryID)
    {
        //
        $category = News::find($CategoryID);
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
    public function show($CategoryID)
    {
        //
        $Category = News::find($CategoryID); // Tìm theo CategoryID

        if (!$Category) {
            return response()->json([
                "message" => "Không tìm thấy danh mục",
                "data" => null
            ], 404);
        }
    
        return response()->json([
            "message" => "Hiển thị danh mục thành công",
            "data" => $Category,
        ]);
    }
    public function destroy($fbID)
    {
        //
        $feedback = News::find($fbID);
        

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