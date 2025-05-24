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

     public $paymentMethod;
     public $emailContent;
 
     public function __construct($paymentMethod, $emailContent)
     {
         $this->paymentMethod = $paymentMethod;
         $this->emailContent = $emailContent;
     }
 
     public function build()
     {
         $subject = $this->paymentMethod === 'bank'
             ? 'Thông tin thanh toán qua Metamask'
             : 'Thông tin thanh toán khi nhận hàng';
 
         return $this->subject($subject)
                     ->view('emails.payment_confirmation'); // Sử dụng view để render email
     }
}