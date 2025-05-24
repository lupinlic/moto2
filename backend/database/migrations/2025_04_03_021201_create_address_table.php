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
        Schema::create('address', function (Blueprint $table) {
            $table->increments('AddressID');
            $table->string('FullName');
            $table->string('PhoneNumber');
            $table->string('Email');
            $table->string('Provinces');
            $table->string('Districts');
            $table->string('Wards');
            $table->string('SpecificAddress');
            $table->boolean('isDefault')->default(false);
            $table->unsignedInteger('CustomerID');
            $table->foreign('CustomerID')->references('CustomerID')->on('customer')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('address');
    }
};