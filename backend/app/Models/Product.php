<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    use HasFactory;
    protected $table = 'product';
    protected $primaryKey = 'ProductID';
    public $timestamps = false;

    protected $fillable = ['CategoryID', 'ProductName', 'ProductPrice','thumbnail'];

    public function category()
    {
        return $this->belongsTo(Category::class, 'CategoryID', 'CategoryID');
    }

    public function versions()
    {
        return $this->hasMany(ProductVersion::class, 'ProductID', 'ProductID');
    }

    public function colors()
    {
        return $this->hasMany(ProductColor::class, 'ProductID', 'ProductID');
    }

    public function favoriteByCustomers()
    {
        return $this->belongsToMany(Customer::class, 'favorite_product', 'ProductID', 'CustomerID');
    }
}