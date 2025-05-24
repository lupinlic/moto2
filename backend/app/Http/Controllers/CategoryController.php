<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $category = Category::with('parent')->get();
        
        return response()->json([
            "message" => "đã lấy danh mục thành công",
            "data" => $category,
        ]);
    }

    public function getByCategoryParent($CategoryParentID){
        $categories = Category::where('CategoryParentID', $CategoryParentID)->get();

        // Nếu có truyền ID danh mục cha thì lọc theo, ngược lại lấy tất cả
        if ($categories->isEmpty()) {
            return response()->json([
                "message" => "Không tìm thấy danh mục con",
                "data" => []
            ], 404);
        }
    
        return response()->json([
            "message" => "Đã lấy danh mục con thành công",
            "data" => $categories,
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
        $category = Category::create($request->all());
        return response()->json([
            "message" => "đã tạo danh mục thành công",
            "data" => $category,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $Categorys,$CategoryID)
    {
        //
        $Category = Category::with('parent')
        ->where('CategoryID',$CategoryID)
        ->get(); // Tìm theo CategoryID

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
    public function update(Request $request,$CategoryID)
    {
        //
        $category = Category::find($CategoryID);
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
    public function destroy($CategoryID)
    {
        //
        $category = Category::find($CategoryID);
        

    if (!$category) {
        return response()->json([
            "message" => "Không tìm thấy danh mục cần xóa"
        ], 404);
    }
        $category->delete();

        return response()->json([
            "message" => "đã xóa danh mục thành công"
        ]);
    }
}