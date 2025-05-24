<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class feedback extends Model
{
    //
    use HasFactory;
    protected $table = 'feedback';
    protected $primaryKey = 'FeedbackID';
    public $timestamps = false;

    protected $fillable = ['CustomerID', 'Content'];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'CustomerID', 'CustomerID');
    }
    
    

}