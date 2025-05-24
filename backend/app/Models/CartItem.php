<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    //
    public $timestamps = false;
    protected $table = 'cart';
    protected $primaryKey = 'CartID';
    protected $fillable = ['UserID', 'ProductID', 'Quantity','ProductColorID','ProductVersionID'];

    public function product()
    {
        return $this->belongsTo(Product::class,'ProductID','ProductID');
    }
    public function version()
    {
        return $this->belongsTo(ProductVersion::class,'ProductVersionID','ProductVersionID');
    }
    public function color()
    {
        return $this->belongsTo(ProductColor::class,'ProductColorID','ProductColorID');
    }


    public function user()
    {
        return $this->belongsTo(User::class,'UserID','UserID');
    }
}