<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\FavoriteProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FavoriteProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $favorite = FavoriteProduct::all();
        
        return response()->json([
            "message" => "đã lấy danh mục thành công",
            "data" => $favorite,
        ]);
    }
    public function getFavoritesByUser($user_id)
{
    $favorites = FavoriteProduct::with([
        'product.category.parent', // load category và parent category
    ])
    ->whereHas('customer', function ($query) use ($user_id) {
        $query->where('UserID', $user_id);
    })
    ->get()
    ->map(function ($favorite) {
        return [
            'ProductID' => $favorite->product->ProductID,
            'ProductName' => $favorite->product->ProductName,
            'ProductPrice' => $favorite->product->ProductPrice,
            'thumbnail' => $favorite->product->thumbnail,
            'CategoryName' => optional($favorite->product->category)->CategoryName,
            'CategoryParentName' => optional(optional($favorite->product->category)->parent)->CategoryParentName,
        ];
    });

    return response()->json([
        'message' => 'Lấy danh sách sản phẩm yêu thích thành công',
        'data' => $favorites,
    ]);
}
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function toggleFavorite(Request $request)
    {
        // Tìm sản phẩm yêu thích của user
        $userId = $request->UserID;
        $productId = $request->ProductID;
    
        // Lấy customer_id từ bảng customer dựa theo user_id
        $customer = Customer::where('UserID', $userId)->first();
    
        if (!$customer) {
            return response()->json(['message' => 'Không tìm thấy khách hàng'], 404);
        }
    
        $favorite = FavoriteProduct::where('CustomerID', $customer->CustomerID)
                            ->where('ProductID', $productId)
                            ->first();
    
        if ($favorite) {
            // Nếu đã tồn tại => xóa
            $favorite->delete();
            return response()->json(['message' => 'Đã xóa khỏi yêu thích', 'favorited' => false]);
        } else {
            // Nếu chưa => thêm mới
            FavoriteProduct::create([
                'CustomerID' => $customer->CustomerID,
                'ProductID' => $productId
            ]);
            return response()->json(['message' => 'Đã thêm vào yêu thích', 'favorited' => true]);
        
        }
    }
    public function checkFavorite(Request $request)
{
   
    // Kiểm tra sản phẩm trong danh sách yêu thích
    $userId = $request->query('UserID');
    $productId = $request->query('ProductID');

    $customer = Customer::where('UserID', $userId)->first();

    if (!$customer) {
        return response()->json(['message' => 'Không tìm thấy khách hàng'], 404);
    }

    $exists = FavoriteProduct::where('CustomerID', $customer->CustomerID)
                      ->where('ProductID', $productId)
                      ->exists();

    return response()->json(['favorited' => $exists]);
}
}