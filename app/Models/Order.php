<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Address;

class Order extends Model
{
    use HasFactory;

    // Statuts de livraison / exécution
    public const STATUS_PENDING   = 'PENDING';
    public const STATUS_PAID      = 'PAID';
    public const STATUS_CANCELLED = 'CANCELLED';

    public const FULFILLMENT_STATUSES = [
        self::STATUS_PENDING,
        self::STATUS_PAID,
        self::STATUS_CANCELLED,
    ];

    // Statuts de paiement
    public const PAYMENT_PENDING = 'PENDING';
    public const PAYMENT_PAID    = 'PAID';
    public const PAYMENT_FAILED  = 'FAILED';

    public const PAYMENT_STATUSES = [
        self::PAYMENT_PENDING,
        self::PAYMENT_PAID,
        self::PAYMENT_FAILED,
    ];

    protected $fillable = [
        'user_id',
        'address_id',
        'total_price',
        'status',
        'payment_status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {

        return $this->hasMany(OrderItem::class);
    }

    public function products()
    {

        return $this->belongsToMany(Product::class, 'order_items')
            ->withPivot(['quantity', 'price'])
            ->withTimestamps();
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }
}
