<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Promotion extends Model
{
    use HasFactory;

    // Colonnes assignables en masse
    protected $fillable = [
        'title',
        'description',
        'discount',
        'type',
        'start_at',
        'end_at',
        'active',
    ];

    /**
     * Relation avec les produits : une promotion peut s'appliquer à plusieurs produits
     */
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_promotion')
            ->withTimestamps();
    }
}
