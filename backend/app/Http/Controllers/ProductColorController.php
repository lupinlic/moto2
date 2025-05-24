<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CategoryParent;
use App\Models\ProductColor;
use Illuminate\Http\Request;

class ProductColorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    $perPage = $request->get('per_page', 10); // số item mỗi trang, mặc định 10

    $color = ProductColor::with('product.category.parent')->paginate($perPage);

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
       
        $file = $request->file('ProductColorImg');
        $product= ProductColor::findOrFail($request->ProductID);
        $category = Category::findOrFail($product->CategoryID);  // Lấy category
        $categoryParent = CategoryParent::findOrFail($category->CategoryParentID);  
        // tạo tên file
        $extension = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
        $file_name = $request->ProductColorName . '.' . $extension;
        $thumbnailPath = $categoryParent->CategoryParentName.'/'.$category->CategoryName.'/'.$product->ProductName.'/'. $file_name;
    // lưu ảnh
        $file->move(public_path('image/'.$categoryParent->CategoryParentName.'/'.$category->CategoryName.'/'.$product->ProductName), $file_name);
        $color = ProductColor::create([
            'ProductID'   => $request->ProductID,
            'ProductColorName'  => $request->ProductColorName,
            'ProductColorImg'     => $thumbnailPath,
            // đường dẫn đã xử lý
        ]);
        
        return response()->json([
            "message" => "đã tạo danh mục thành công",
            "data" => $color,
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    public function getByProduct($ProductID){
        
        $color = ProductColor::with(['product.category.parent'])
        ->where('ProductID', $ProductID)
        ->get();
        // Nếu có truyền ID danh mục cha thì lọc theo, ngược lại lấy tất cả
        if ($color->isEmpty()) {
            return response()->json([
                "message" => "Không tìm thấy danh mục con",
                "data" => []
            ], 404);
        }
    
        return response()->json([
            "message" => "Đã lấy danh mục con thành công",
            "data" => $color,
        ]);
    }
}