<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Promotion;

class Product extends Model
{
    use HasFactory;

    // Champs assignables en masse
    protected $fillable = [
        'name',
        'description',
        'price',
        'category_id',
        'stock',
    ];

    /**
     * Relation avec la catégorie
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Relation avec les promotions
     */
    public function promotions()
    {
        return $this->belongsToMany(Promotion::class, 'product_promotion')
            ->withTimestamps();
    }
}
