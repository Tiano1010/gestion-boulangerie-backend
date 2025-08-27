<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderItem;

class OrdersTableSeeder extends Seeder
{
    public function run(): void
    {
        $order = Order::create([
            'user_id' => 3, // Client1
            'total_price' => 0,
            'status' => 'PENDING',
            'payment_status' => 'PENDING',
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => 1,
            'quantity' => 2,
            'price' => 1.5,
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => 3,
            'quantity' => 1,
            'price' => 1.2,
        ]);

        $order->update(['total_price' => 2*1.5 + 1*1.2]);
    }
}
