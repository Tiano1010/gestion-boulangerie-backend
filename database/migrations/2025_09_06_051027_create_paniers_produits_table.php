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
        Schema::create('paniers_produits', function (Blueprint $table) {
            $table->id();
            $table->integer('panier_id');
            $table->integer('product_id');
            $table->integer('quantity')->default(1);
            $table->timestamps();

            $table->foreign('panier_id')->references('id')->on('paniers')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paniers_produits');
    }
};
