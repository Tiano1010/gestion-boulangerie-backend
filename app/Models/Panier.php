<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Panier extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'est_actif',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(PanierProduit::class);
    }

    public function getTotalPanier()
    {
        return $this->items->sum(fn($item) => $item->product->price * $item->quantity);
    }
    public function produits()
    {
        return $this->belongsToMany(Product::class, 'paniers_produits')
            ->withPivot('quantity')
            ->withTimestamps();
    }

}
