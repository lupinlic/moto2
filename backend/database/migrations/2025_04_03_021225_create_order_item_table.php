<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_item', function (Blueprint $table) {
            $table->increments('OrderItemID');
            $table->unsignedInteger('ProductID');
            $table->foreign('ProductID')->references('ProductID')->on('product')->onDelete('cascade');
            $table->unsignedInteger('OrderID');
            $table->foreign('OrderID')->references('OrderID')->on('orders')->onDelete('cascade');
            $table->unsignedInteger('ProductVersionID');
            $table->foreign('ProductVersionID')->references('ProductVersionID')->on('product_version')->onDelete('cascade');
            $table->unsignedInteger('ProductColorID');
            $table->foreign('ProductColorID')->references('ProductColorID')->on('product_color')->onDelete('cascade');
            $table->Integer('Quantity');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_item');
    }
};