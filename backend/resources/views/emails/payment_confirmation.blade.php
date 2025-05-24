<!DOCTYPE html>
<html>

<head>
    <title>{{ $paymentMethod }} Payment Notification</title>
</head>

<body>
    <h1>{{ $paymentMethod === 'bank' ? 'Thanh toán qua Metamask' : 'Thanh toán khi nhận hàng' }}</h1>
    <p>{{ $emailContent }}</p>
</body>

</html>