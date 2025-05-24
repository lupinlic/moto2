<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductColor extends Model
{
    //
    use HasFactory;
    protected $table = 'product_color';
    protected $primaryKey = 'ProductColorID';
    public $timestamps = false;

    protected $fillable = ['ProductID', 'ProductColorName','ProductColorImg'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'ProductID', 'ProductID');
    }
}