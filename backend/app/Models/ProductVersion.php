<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVersion extends Model
{
    //
    use HasFactory;
    protected $table = 'product_version';
    protected $primaryKey = 'ProductVersionID';
    public $timestamps = false;

    protected $fillable = ['ProductID', 'ProductVersionName','ProductVersionQuantity'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'ProductID', 'ProductID');
    }
}