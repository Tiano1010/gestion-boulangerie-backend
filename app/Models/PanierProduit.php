<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PanierProduit extends Model
{
    use HasFactory;
    protected $table = 'paniers_produits';
    protected $fillable = [
        'panier_id',
        'product_id',
        'quantity',
    ];

    // 🔗 Relation avec le panier
    public function panier()
    {
        return $this->belongsTo(Panier::class);
    }

    // 🔗 Relation avec le produit
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
