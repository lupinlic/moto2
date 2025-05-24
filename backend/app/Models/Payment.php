<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    //
    use HasFactory;
    protected $table = 'payment';
    protected $primaryKey = 'PaymentID';
    public $timestamps = false;
    protected $fillable = [
        'OrderID',
        'Method',
        'Status',
    ];

    // Mối quan hệ với Order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}