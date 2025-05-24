<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Customer;
use Illuminate\Http\Request;

class CartController extends Controller
{
    //
    public function addToCart(Request $request)
    {
        $UserID = $request->UserID;

    $cartItem = CartItem::where('UserID', $UserID)
        ->where('ProductID', $request->ProductID)
        ->where('ProductColorID', $request->ProductColorID)
        ->where('ProductVersionID', $request->ProductVersionID)
        ->first();

    if ($cartItem) {
        // Cộng thêm số lượng nếu sản phẩm đã có
        $cartItem->Quantity += $request->Quantity;
        $cartItem->save();
    } else {
        // Thêm sản phẩm mới vào giỏ hàng
        CartItem::create([
            'UserID' => $UserID,
            'ProductID' => $request->ProductID,
            'ProductColorID' => $request->ProductColorID,
            'ProductVersionID' => $request->ProductVersionID,
            'Quantity' => $request->Quantity,
        ]);
    }

    return response()->json(['message' => 'Đã thêm sản phẩm vào giỏ hàng thành công']);
    }
    public function getCart($user_id)
    {
        $cartItems = CartItem::with('product.category.parent', 'version', 'color')
                    ->where('UserID', $user_id)
                    ->get();

        return response()->json([
            'message' => 'Success',
            'data' => $cartItems
        ]);
    }
    public function updateCart(Request $request)
    {
        $item = CartItem::where('UserID', $request->UserID)
        ->where('ProductID', $request->ProductID)
        ->where('ProductColorID', $request->ProductColorID)
        ->where('ProductVersionID', $request->ProductVersionID)
                        ->first();

        if (!$item) return response()->json(['message' => 'Cart item not found'], 404);

        $item->Quantity = $request->Quantity;
        $item->save();

        return response()->json(['message' => 'Cart updated']);
    }

    public function removeFromCart($CartID)
    {

        $deleted = CartItem::where('CartID',$CartID)->delete();

    if ($deleted) {
        return response()->json(['message' => 'Item removed from cart']);
    }

    return response()->json(['message' => 'Item not found'], 404);
    }
    public function updateQuantity(Request $request)
{
    $cartItem = CartItem::where('CartID', $request->CartID)->first();

    if (!$cartItem) {
        return response()->json(['message' => 'Item not found'], 404);
    }

    $cartItem->Quantity = $request->Quantity;
    $cartItem->save();

    return response()->json(['message' => 'Quantity updated']);
}
}