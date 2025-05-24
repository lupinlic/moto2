<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PaymentConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */

     public $emailContent;
    public $orderId;
    public $customerName;
    public $customerEmail;
    public $customerPhone;
    public $shippingAddress;
    public $paymentMethod;
    public $orderDetails;
    public $totalPrice;

    public function __construct($emailContent, $orderId, $customerName, $customerEmail, $customerPhone, $shippingAddress, $paymentMethod, $orderDetails, $totalPrice)
    {
        $this->emailContent = $emailContent;
        $this->orderId = $orderId;
        $this->customerName = $customerName;
        $this->customerEmail = $customerEmail;
        $this->customerPhone = $customerPhone;
        $this->shippingAddress = $shippingAddress;
        $this->paymentMethod = $paymentMethod;
        $this->orderDetails = $orderDetails;
        $this->totalPrice = $totalPrice;
    }
     public function build()
    {
        return $this->subject('Xác nhận thanh toán')
                    ->view('emails.payment_confirmation'); // Tên file blade
    }
}