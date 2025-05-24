<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CategoryParent;
use App\Models\Product;
use App\Models\ProductColor;
use App\Models\ProductVersion;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $products = Product::with(['category.parent', 'colors', 'versions'])->get(); // Eager loading
        return response()->json($products);

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
        // Lưu ảnh thumbnail vào storage
    $file = $request->file('thumbnail');
    $category = Category::findOrFail($request->CategoryID);  // Lấy category
    $categoryParent = CategoryParent::findOrFail($category->CategoryParentID);  
    // tạo tên file
    $extension = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
    $file_name = $request->ProductName . '.' . $extension;
    $thumbnailPath = $categoryParent->CategoryParentName.'/'.$category->CategoryName.'/'.$request->ProductName.'/'. $file_name;
// lưu ảnh
    $file->move(public_path('image/'.$categoryParent->CategoryParentName.'/'.$category->CategoryName.'/'.$request->ProductName), $file_name);
    $product = Product::create([
        'ProductName'   => $request->ProductName,
        'CategoryID'    => $request->CategoryID,
        'ProductPrice'  => $request->ProductPrice,
        'thumbnail'     => $file_name, // đường dẫn đã xử lý
    ]);
    
    return response()->json(['message' => 'Product created successfully', 'data' => $product], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $products = Product::with(['category.parent', 'colors', 'versions'])->findOrFail($id); // Eager loading

        $products->thumbnail = url('image/' . $products->thumbnail);
        return response()->json($products);
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
    public function update(Request $request,$ProductID)
    {
        //
        $product = Product::find($ProductID);
        $productName = $request->input('ProductName');
    $productPrice = $request->input('ProductPrice');
    $categoryID = $request->input('CategoryID');

    // Kiểm tra xem các trường bắt buộc có giá trị hợp lệ không
    if (empty($productName) || empty($productPrice) || empty($categoryID)) {
        return response()->json(['message' => 'Product name, price, and category are required.'], 400);
    }

    // Cập nhật các trường
    $product->ProductName = $productName;
    $product->ProductPrice = $productPrice;
    $product->CategoryID = $categoryID;

    // Nếu có file ảnh mới
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');

            // Lấy category & parent
            $category = Category::findOrFail($request->CategoryID);
            $categoryParent = CategoryParent::findOrFail($category->CategoryParentID);

            $filePath = public_path('image/' . $categoryParent->CategoryParentName . '/' . $category->CategoryName . '/' . $request->ProductName . '/' . $product->thumbnail);

            if (file_exists($filePath)) {
                unlink($filePath); // Xóa ảnh cũ
            }

            // Tạo tên file và đường dẫn
            $extension = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
            $file_name = $request->ProductName . '.' . $extension;
            $filterFile_name = preg_replace('/[^A-Za-z0-9\-_.]/', '_', $file_name);

            // Lưu ảnh mới
            $file->move(public_path('image/' . $categoryParent->CategoryParentName . '/' . $category->CategoryName . '/' . $request->ProductName), $filterFile_name);

            // Cập nhật đường dẫn mới
            $product->thumbnail = $filterFile_name;      
        }
        $product->update();
        return response()->json([
            'message' => 'Product updated successfully', 
            'data' => $product
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($ProductID)
    {
        $product = Product::find($ProductID);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found.'
            ], 404);
        }
        $category = Category::findOrFail($product->CategoryID);
        $categoryParent = CategoryParent::findOrFail($category->CategoryParentID);
    
        // Xóa ảnh nếu có
        $imagePath = public_path('image/' . $categoryParent->CategoryParentName . '/' . $category->CategoryName . '/' . $product->ProductName .'/'. $product->thumbnail );
        if (file_exists($imagePath)) {
            unlink($imagePath);
        }
    
        $product->delete();
    
        return response()->json([
            'message' => 'Product deleted successfully.'
        ], 200);
    }
    public function getByCategoryParent($id)
{
    $categories = Category::where('CategoryParentID', $id)->pluck('CategoryID');
    $products = Product::with(['category.parent'])
        ->whereIn('CategoryID', $categories)
        ->get();

    return response()->json([
        'message' => 'Products by category parent',
        'data' => $products
    ]);
}
public function getByCategory($id)
{
    $products = Product::with(['category.parent'])
        ->where('CategoryID', $id)
        ->get();

    return response()->json([
        'message' => 'Products by category',
        'data' => $products
    ]);
}
}