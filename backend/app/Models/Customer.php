<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    //
    use HasFactory;
    protected $table = 'customer';
    protected $primaryKey = 'CustomerID';
    public $timestamps = false;

    protected $fillable = ['CustomerName','FullName','PhoneNumber', 'Email','UserID'];

    public function addresses()
    {
        return $this->hasMany(Address::class, 'CustomerID', 'CustomerID');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'CustomerID', 'CustomerID');
    }

    public function favoriteProducts()
    {
        return $this->belongsToMany(Product::class, 'favorite_product', 'CustomerID', 'ProductID');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'UserID', 'UserID'); // 'user_id' là khóa ngoại
    }
}