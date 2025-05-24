<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FavoriteProduct extends Model
{
    //
    use HasFactory;
    protected $table = 'favorite_product';
    public $timestamps = false;
    protected $primaryKey = 'FavoriteProductID';

    protected $fillable = ['CustomerID', 'ProductID'];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'CustomerID', 'CustomerID');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'ProductID', 'ProductID');
    }
}