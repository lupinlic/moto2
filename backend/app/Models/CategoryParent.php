<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryParent extends Model
{
    //
    protected $table = 'category_parent';
    protected $primaryKey = 'CategoryParentID';
    public $timestamps = false;

    protected $fillable = ['CategoryParentName'];

    public function categories()
    {
        return $this->hasMany(Category::class, 'CategoryParentID', 'CategoryParentID');
    }
}