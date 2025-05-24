<h2>Cảm ơn bạn đã đặt hàng!</h2>

<p>{{ $emailContent }}</p>
<p>Chúng tôi đã nhận được đơn hàng của bạn và đang xử lý.</p>
<p>Thông tin đơn hàng của bạn như sau:</p>
<p><strong>Mã đơn hàng:</strong> {{ $orderId }}</p>
<p>Tên: {{ $customerName }}</p>
<p>Email: {{ $customerEmail }}</p>
<p>Số điện thoại: {{ $customerPhone }}</p>
<p>Địa chỉ giao hàng: {{ $shippingAddress }}</p>
<p><strong>Phương thức thanh toán:</strong> {{ $paymentMethod }}</p>

<h3>Chi tiết đơn hàng:</h3>
<ul>
    @foreach($orderDetails as $item)
    <li>{{ $item['ProductName'] }} - SL: {{ $item['Quantity'] }} - Giá: {{ number_format($item['Price']) }}đ</li>
    @endforeach
</ul>

<p><strong>Tổng tiền:</strong> {{ number_format($totalPrice) }}đ</p>