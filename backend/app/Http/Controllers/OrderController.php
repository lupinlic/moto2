<?php

namespace App\Http\Controllers;


use App\Http\Requests\OrderRequest;
use App\Mail\PaymentConfirmation;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $orders = Order::with('customer', 'address','payment')
        ->orderBy('OrderDate', 'desc')
        ->get();
        
        return response()->json([
            "message" => "đã hiển thị đơn hàng thành công",
            "data" => $orders,
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
        $order = Order::create([
            'CustomerID' => $request->CustomerID,
            'AddressID' => $request->AddressID,
            'OrderDate' => $request->OrderDate,
            'status' => 'pending',
            'TotalPrice' => $request->TotalPrice, // sẽ cập nhật sau
        ]);
        $order->payment()->create([
            'Method' => $request->Method,
            'Status' => $request->Method === 'cod' ? 'pending' : 'completed', 
        ]);

        
        $totalPrice = 0;

    foreach ($request->items as $item) {
        $product = Product::find($item['ProductID']);

        if (!$product) continue;

        $price = $product->ProductPrice ?? 0;

        $order->items()->create([
            'ProductID' => $item['ProductID'],
            'ProductVersionID' => $item['ProductVersionID'] ?? null,
            'ProductColorID' => $item['ProductColorID'] ?? null,
            'Quantity' => $item['Quantity'],
        ]);

        $totalPrice += $price * $item['Quantity'];
    }


    return response()->json([
        'message' => 'Đặt hàng thành công',
        'data' => $order->load('items')
    ]);
    }
    public function show($OrderID)
    {
        //
        $order = Order::find($OrderID); // Tìm theo CategoryID

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
    public function update(OrderRequest $request, Order $order)
    {
        $order->update($request->all());

        return response()->json([
            "message" => "đã sửa đơn hàng thành công",
            "data" => $order,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();

        return response()->json([
            "message" => "đã xóa đơn hàng thành công"
        ]);
    }
    public function getOrderDetailOfOrder(Order $order)
    {
        $order_details = $order->items()->with(['product', 'productVersion', 'productColor'])->get();

        if ($order_details->isNotEmpty()) {
            return response()->json([
                "message" => "Đã lấy các đơn hàng được đặt",
                "data" => $order_details, // Trả về danh sách đặt bàn thay vì customer
            ]);
        } else {
            return response()->json([
                "message" => "ko có đơn hang nào cả",
            ], 404);
        }
    }
    public function UpdateTotalAmount(Order $order)
    {
        $orderDetails = $order->items()->with('product')->get();
        if ($orderDetails->isEmpty()) {
            return response()->json([
                "message" => "Không có đơn hàng chi tiết nào cả",
            ], 404);
        }
    
        $totalPrice = 0;
    
        foreach ($orderDetails as $item) {
            if ($item->product) {
                $price = $item->product->ProductPrice ?? 0;
                $totalPrice += $price * $item->Quantity;
            }
        }
    
        $order->update(['TotalPrice' => $totalPrice]);
    
        return response()->json([
            "message" => "Đã cập nhật tổng tiền đơn hàng thành công",
            "data" => $order
        ]);
    }
// mail
public function sendEmail(Request $request)
{
    try {
        Mail::to($request->customerEmail)->send(new PaymentConfirmation(
            $request->emailContent,
            $request->orderId,
            $request->customerName,
            $request->customerEmail,
            $request->customerPhone,
            $request->shippingAddress,
            $request->paymentMethod,
            $request->orderDetails,
            $request->totalPrice
        ));

        return response()->json(['message' => 'Email đã được gửi thành công'], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Gửi email thất bại', 'details' => $e->getMessage()], 500);
    }
}


// thống kê
public function getAdvancedStatistics(Request $request)
{
    $type = $request->query('type', 'day'); // day | month | quarter | year
    $from = $request->query('from_date');
    $to = $request->query('to_date');

    $orders = Order::query();

    // Lọc theo khoảng thời gian
    if ($from && $to) {
        $orders->whereBetween('OrderDate', [$from, $to]);
    }

    $allOrders = clone $orders;
    $completedOrders = clone $orders;

    $totalOrders = $allOrders->count();
    $completed = $completedOrders->where('status', 'completed')->get();
    $completedCount = $completed->count();
    $revenue = $completed->sum('TotalPrice');

    // === Thống kê doanh thu theo thời gian ===
    $groupByFormat = match ($type) {
        'day' => '%Y-%m-%d',
        'month' => '%Y-%m',
        'quarter' => 'QUARTER(OrderDate)',
        'year' => '%Y',
        default => '%Y-%m-%d',
    };

    if ($type === 'quarter') {
        $chartData = Order::selectRaw("QUARTER(OrderDate) as time, SUM(TotalPrice) as total")
            ->where('status', 'completed')
            ->when($from && $to, fn ($q) => $q->whereBetween('OrderDate', [$from, $to]))
            ->groupBy('time')
            ->orderBy('time')
            ->get()
            ->map(fn ($item) => ['label' => 'Quý ' . $item->time, 'total' => $item->total]);
    } else {
        $chartData = Order::selectRaw("DATE_FORMAT(OrderDate, '$groupByFormat') as time, SUM(TotalPrice) as total")
            ->where('status', 'completed')
            ->when($from && $to, fn ($q) => $q->whereBetween('OrderDate', [$from, $to]))
            ->groupBy('time')
            ->orderBy('time')
            ->get()
            ->map(fn ($item) => ['label' => $item->time, 'total' => $item->total]);
    }

    // === Top 5 sản phẩm bán chạy ===
    $topProducts = OrderItem::select('ProductID', DB::raw('SUM(Quantity) as total_quantity'))
        ->join('orders', 'orders.OrderID', '=', 'order_item.OrderID')
        ->where('orders.status', 'completed')
        ->when($from && $to, fn ($q) => $q->whereBetween('orders.OrderDate', [$from, $to]))
        ->groupBy('ProductID')
        ->orderByDesc('total_quantity')
        ->limit(5)
        ->with('product') // cần có quan hệ product trong OrderItem
        ->get()
        ->map(fn ($item) => [
            'name' => $item->product->ProductName ?? 'SP ' . $item->ProductID,
            'quantity' => $item->total_quantity
        ]);

    return response()->json([
        'total_orders' => $totalOrders,
        'completed_orders' => $completedCount,
        'revenue' => $revenue,
        'chart' => [
            'labels' => $chartData->pluck('label'),
            'data' => $chartData->pluck('total'),
        ],
        'top_products' => $topProducts,
    ]);
}



// trạng thái đơn hàng
public function updateStatus(Request $request, $id)
{
    $order = Order::findOrFail($id);

    $nextStatus = $request->input('status');

    // Kiểm tra logic nếu cần (ví dụ: không cho nhảy cóc trạng thái)
    $allowedTransitions = [
        'pending' => 'processing',
        'processing' => 'completed',
    ];

    if (!isset($allowedTransitions[$order->status]) || $allowedTransitions[$order->status] !== $nextStatus) {
        return response()->json(['message' => 'Chuyển trạng thái không hợp lệ'], 400);
    }

    $order->status = $nextStatus;
    $order->save();

    return response()->json(['message' => 'Đã cập nhật trạng thái thành công', 'order' => $order]);
}
// hủy đơn
public function cancel($id)
{
    $order = Order::find($id);

    if (!$order) {
        return response()->json(['message' => 'Không tìm thấy đơn hàng'], 404);
    }
    $order->status = 'canceled';
    $order->save();

    return response()->json([
        'message' => 'Hủy đơn hàng thành công',
        'data' => $order
    ]);
}
// đơn hàng mới
public function getNewOrders()
{
    $orders = Order::where('is_notified', '0')
                    ->orderBy('OrderDate', 'desc')
                    ->take(10)
                    ->get();

    return response()->json(['data' => $orders]);
}
// thong báo đơn hàng mới
public function markOrdersAsNotified(Request $request)
{
    $id = $request->input('id');

    if (empty($id)) {
        return response()->json([
            'message' => 'Không có ID đơn hàng được cung cấp.',
        ], 400);
    }

    $order = Order::find($id);

    if (!$order) {
        return response()->json([
            'message' => 'Đơn hàng không tồn tại.',
        ], 404);
    }

    $order->is_notified = 1;
    $order->save();

    return response()->json([
        'message' => 'Đã cập nhật trạng thái thông báo cho đơn hàng.',
        'order_id' => $id
    ]);
}


// thanh toán momo
public function momo_payment(Request $request)
{

    $payload = $request->input('payload');
    $cartid = $request->input('cartid');

    $endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
    $partnerCode = 'MOMOBKUN20180529';
    $accessKey = 'klm05TvNBzhg7h7j';
    $secretKey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';
    $orderInfo = "Thanh toán qua ATM MoMo";
    $amount = $request->Total;

    $orderId = time() . "";
    $redirectUrl = "http://localhost:3000/Thanks";
    $ipnUrl = "http://localhost:3000/Thanks";
    $extraData = json_encode([
        'cartid' => $cartid,
        'payload' => $payload,
    ]);

    $requestId = time() . "";
    $requestType = "payWithATM";

    $rawHash = "accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType";

    $signature = hash_hmac("sha256", $rawHash, $secretKey);

    $data = [
        'partnerCode' => $partnerCode,
        'partnerName' => "Test",
        'storeId' => "MomoTestStore",
        'requestId' => $requestId,
        'amount' => $amount,
        'orderId' => $orderId,
        'orderInfo' => $orderInfo,
        'redirectUrl' => $redirectUrl,
        'ipnUrl' => $ipnUrl,
        'lang' => 'vi',
        'extraData' => $extraData,
        'requestType' => $requestType,
        'signature' => $signature
    ];

    // Gửi POST request bằng Guzzle (Laravel hỗ trợ)
    $result = $this->execPostRequest($endpoint, json_encode($data));
    $jsonResult = json_decode($result, true);

    if (isset($jsonResult['payUrl'])) {
        return response()->json([
            'payUrl' => $jsonResult['payUrl'],
        ]);
    } else {
        return response()->json([
            'error' => 'Không thể tạo liên kết thanh toán',
            'details' => $jsonResult
        ], 500);
    }
}
private function execPostRequest($url, $data)
{
    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data)
    ]);

    $result = curl_exec($ch);

    if (curl_errno($ch)) {
        throw new \Exception('cURL error: ' . curl_error($ch));
    }

    curl_close($ch);
    return $result;
}
}