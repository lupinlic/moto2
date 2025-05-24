<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    //
    use HasFactory;
    protected $table = 'news';
    protected $primaryKey = 'NewsID';
    public $timestamps = false;

    protected $fillable = ['Title', 'Content', 'Image'];
}