<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        
        $address = Address::all();
        
        return response()->json([
            "message" => "đã tạo danh mục thành công",
            "data" => $address,
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
        $userId = $request->UserID;
        $addressCount = Address::where('UserID', $userId)->count();
        $address = new Address();
    $address->UserID = $userId;
    $address->FullName = $request->FullName;
    $address->PhoneNumber = $request->PhoneNumber;
    $address->Email = $request->Email;

    $address->Provinces = $request->Provinces;
    $address->Districts = $request->Districts;
    $address->Wards = $request->Wards;
    $address->SpecificAddress = $request->SpecificAddress;
    // Nếu chưa có địa chỉ nào thì mặc định là type = 1
    $address->isDefault = ($addressCount == 0) ? 1 : 0;

    $address->save();

    if ($addressCount == 0) {
        Customer::where('UserID', $userId)->update([
            'PhoneNumber' => $request->PhoneNumber,
        ]);
    }
        return response()->json([
            "message" => "đã tạo danh mục thành công",
            "data" => $address,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($addressid)
    {
        //
        $address = Address::find($addressid); // Tìm theo addressID

        if (!$address) {
            return response()->json([
                "message" => "Không tìm thấy danh mục",
                "data" => null
            ], 404);
        }
    
        return response()->json([
            "message" => "Hiển thị danh mục thành công",
            "data" => $address,
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
    public function update(Request $request,$AddressID)
    {
        //
        $address = Address::find($AddressID);
        if (!$address) {
            return response()->json([
                "message" => "Không tìm thấy danh mục",
                "data" => null
            ], 404);
        }
    
        // Cập nhật dữ liệu
        $address->update($request->all());
    
        return response()->json([
            "message" => "Đã sửa danh mục thành công",
            "data" => $address,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($AddressID)
    {
        //
        $address = Address::find($AddressID);
        

    if (!$address) {
        return response()->json([
            "message" => "Không tìm thấy danh mục cần xóa"
        ], 404);
    }
        $address->delete();

        return response()->json([
            "message" => "đã xóa danh mục thành công"
        ]);
    }
    public function getAddressesByUser($user_id)
    {
        $addresses = Address::where('UserID', $user_id)->get();

        return response()->json([
            'message' => 'Lấy địa chỉ thành công',
            'data' => $addresses
        ], 200);
    }
    public function getDefaultAddress($userId)
    {
        // Lấy địa chỉ mặc định của người dùng
        $defaultAddress = Address::getDefaultAddress($userId);

        if ($defaultAddress) {
            return response()->json([
                'status' => 'success',
                'data' => $defaultAddress
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'No default address found.'
            ], 404);
        }
    }
    public function setDefaultAddress(Request $request, $userId, $addressId)
    {
        // Gọi phương thức setDefaultAddress để cập nhật địa chỉ
        $address = Address::setDefaultAddress($userId, $addressId);

        if ($address) {
            return response()->json([
                'status' => 'success',
                'message' => 'Default address updated successfully.',
                'data' => $address
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Address not found or invalid user.'
            ], 404);
        }
    }
}