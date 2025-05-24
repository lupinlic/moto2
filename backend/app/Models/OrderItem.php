<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    //
    use HasFactory;
    protected $table = 'order_item';
    protected $primaryKey = 'OrderItemID';
    public $timestamps = false;

    protected $fillable = ['OrderID', 'ProductID','ProductVersionID','ProductColorID', 'Quantity'];

    public function order()
    {
        return $this->belongsTo(Order::class, 'OrderID', 'OrderID');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'ProductID', 'ProductID');
    }
    public function productVersion()
    {
        return $this->belongsTo(ProductVersion::class, 'ProductVersionID', 'ProductVersionID');
    }

    public function productColor()
    {
        return $this->belongsTo(ProductColor::class, 'ProductColorID', 'ProductColorID');
    }
}