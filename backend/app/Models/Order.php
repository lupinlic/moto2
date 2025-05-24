<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    //
    use HasFactory;
    protected $table = 'orders';
    protected $primaryKey = 'OrderID';
    public $timestamps = false;

    protected $fillable = ['CustomerID', 'TotalPrice','OrderDate', 'status','AddressID'];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'CustomerID', 'CustomerID');
    }

    public function payment()
    {
        return $this->hasOne(Payment::class, 'OrderID', 'OrderID');
    }
    public function items()
    {
        return $this->hasMany(OrderItem::class, 'OrderID', 'OrderID');
    }
    public function address()
{
    return $this->belongsTo(Address::class, 'AddressID');
}
}