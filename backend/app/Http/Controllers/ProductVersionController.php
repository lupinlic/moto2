<?php

namespace App\Http\Controllers;

use App\Models\ProductVersion;
use Illuminate\Http\Request;

class ProductVersionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    $perPage = $request->get('per_page', 10); // số item mỗi trang, mặc định 10

    $color = ProductVersion::with('product.category.parent')->paginate($perPage);

    return response()->json([
        "message" => "Lấy danh sách thành công",
        "data" => $color,
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
        $version = ProductVersion::create($request->all());
        return response()->json([
            "message" => "đã tạo danh mục thành công",
            "data" => $version,
        ]);
    }
    public function getByProduct($ProductID){
        $version = ProductVersion::where('ProductID', $ProductID)->get();

        // Nếu có truyền ID danh mục cha thì lọc theo, ngược lại lấy tất cả
        if ($version->isEmpty()) {
            return response()->json([
                "message" => "Không tìm thấy danh mục con",
                "data" => []
            ], 404);
        }
    
        return response()->json([
            "message" => "Đã lấy danh mục con thành công",
            "data" => $version,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($versionid)
    {
        //
        $version = ProductVersion::with(['product.category.parent'])->findOrFail($versionid); // Tìm theo CustomerID

        if (!$version) {
            return response()->json([
                "message" => "Không tìm thấy danh mục",
                "data" => null
            ], 404);
        }
    
        return response()->json([
            "message" => "Hiển thị danh mục thành công",
            "data" => $version,
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
    public function update(Request $request,$ProductVersionID)
    {
        //
        $version = ProductVersion::find($ProductVersionID);
        if (!$version) {
            return response()->json([
                "message" => "Không tìm thấy danh mục",
                "data" => null
            ], 404);
        }
    
        // Cập nhật dữ liệu
        $version->update($request->all());
    
        return response()->json([
            "message" => "Đã sửa danh mục thành công",
            "data" => $version,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($ProductVersionID)
    {
        //
        $version = ProductVersion::find($ProductVersionID);
        

    if (!$version) {
        return response()->json([
            "message" => "Không tìm thấy danh mục cần xóa"
        ], 404);
    }
        $version->delete();

        return response()->json([
            "message" => "đã xóa danh mục thành công"
        ]);
    }
}