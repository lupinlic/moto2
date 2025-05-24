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
        Schema::create('product_version', function (Blueprint $table) {
            $table->increments('ProductVersionID');
            $table->string('ProductVersionName');
            $table->unsignedInteger('ProductID');
            $table->foreign('ProductID')->references('ProductID')->on('product')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_version');
    }
};