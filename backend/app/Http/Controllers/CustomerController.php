<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $customer =Customer::all();
        
        return response()->json([
            "message" => "đã tạo danh mục thành công",
            "data" => $customer,
        ]);
    }
    public function getByUser($UserID){
        $customer = Customer::where('UserID', $UserID)->first();

        // Nếu có truyền ID danh mục cha thì lọc theo, ngược lại lấy tất cả
        return response()->json([
            "message" => "Đã lấy khách hàng",
            "data" => $customer,
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
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $Customers,$CustomerID)
    {
        //
        $Customer = Customer::find($CustomerID); // Tìm theo CustomerID

        if (!$Customer) {
            return response()->json([
                "message" => "Không tìm thấy danh mục",
                "data" => null
            ], 404);
        }
    
        return response()->json([
            "message" => "Hiển thị danh mục thành công",
            "data" => $Customer,
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
    public function update(Request $request,$CustomerID)
    {
        //
        $Customer = Customer::find($CustomerID);
        if (!$Customer) {
            return response()->json([
                "message" => "Không tìm thấy danh mục",
                "data" => null
            ], 404);
        }
    
        // Cập nhật dữ liệu
        $Customer->update($request->all());
    
        return response()->json([
            "message" => "Đã sửa danh mục thành công",
            "data" => $Customer,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($CustomerID)
    {
        //
        $Customer = Customer::find($CustomerID);
        

    if (!$Customer) {
        return response()->json([
            "message" => "Không tìm thấy danh mục cần xóa"
        ], 404);
    }
        $Customer->delete();

        return response()->json([
            "message" => "đã xóa danh mục thành công"
        ]);
    }
    public function getOrderOfCustomer( $UserID)
{
    $Customer = Customer::where('UserID', $UserID)->first();
    

    if (!$Customer) {
        return response()->json([
            "message" => "Không tìm thấy khách hàng tương ứng với người dùng hiện tại",
        ], 404);
    }

    $orders = $Customer->orders()->with('payment','items')->get();

    if ($orders->isNotEmpty()) {
        return response()->json([
            "message" => "Đã lấy các lượt đặt thuộc về khách hàng này",
            "data" => $orders,
        ]);
    } else {
        return response()->json([
            "message" => "Khách hàng này chưa đặt lần nào cả",
        ], 404);
    }
}


}