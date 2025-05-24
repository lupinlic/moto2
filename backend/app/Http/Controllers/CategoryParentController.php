<?php

namespace App\Http\Controllers;

use App\Models\CategoryParent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CategoryParentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $categoryParents = CategoryParent::all();
        
        return response()->json([
            "message" => "đã tạo danh mục thành công",
            "data" => $categoryParents,
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
        $categoryParents = CategoryParent::create($request->all());
        return response()->json([
            "message" => "đã tạo danh mục thành công",
            "data" => $categoryParents,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($CategoryID)
    {
        //
        $categoryParent = CategoryParent::find($CategoryID); // Tìm theo CategoryID

        if (!$categoryParent) {
            return response()->json([
                "message" => "Không tìm thấy danh mục",
                "data" => null
            ], 404);
        }
    
        return response()->json([
            "message" => "Hiển thị danh mục thành công",
            "data" => $categoryParent,
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
    public function update(Request $request,$CategoryParentID)
    {
        //
        $categoryParent = CategoryParent::find($CategoryParentID);
        if (!$categoryParent) {
            return response()->json([
                "message" => "Không tìm thấy danh mục",
                "data" => null
            ], 404);
        }
    
        // Cập nhật dữ liệu
       $categoryParent->update($request->all());
    
        return response()->json([
            "message" => "Đã sửa danh mục thành công",
            "data" => $categoryParent,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($CategoryParentID)
    {
        //
        $categoryParent = CategoryParent::find($CategoryParentID);
        

    if (!$categoryParent) {
        return response()->json([
            "message" => "Không tìm thấy danh mục cần xóa"
        ], 404);
    }
        $categoryParent->delete();

        return response()->json([
            "message" => "đã xóa danh mục thành công"
        ]);
    }
}