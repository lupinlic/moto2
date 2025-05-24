<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
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
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $orderDetail = OrderItem::create($request->all());
        
        return response()->json([
            "message" => "đã tạo đơn hàng chi tiết thành công",
            "data" => $orderDetail,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($OrderID)
    {
        //
        $order = OrderItem::with('product', 'productVersion', 'productColor')
        ->where('OrderID', $OrderID)
        ->get();

        if (!$order) {
            return response()->json([
                "message" => "Không tìm thấy danh mục",
                "data" => null
            ], 404);
        }
    
        return response()->json([
            "message" => "Hiển thị danh mục thành công",
            "data" => $order,
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
    public function update(Request $request, OrderItem $orderDetail)
    {
        $orderDetail->update($request->all());

        return response()->json([
            "message" => "đã sửa đơn hàng chi tiết thành công",
            "data" => $orderDetail,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderItem $orderDetail)
    {
        $orderDetail->delete();

        return response()->json([
            "message" => "đã xóa đơn hàng chi tiết thành công"
        ]);
    }
}