<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;

class ClientController extends Controller
{
    // Voir les commandes du client
    public function orders(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)
            ->with('items.product') // inclut les produits
            ->get();
        return response()->json($orders);
    }

    // Créer une nouvelle commande
    public function createOrder(Request $request)
    {
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $order = Order::create([
            'user_id' => $request->user()->id,
            'total_price' => 0,
            'status' => 'PENDING',
        ]);

        $total = 0;
        foreach ($request->items as $item) {
            $product = Product::find($item['product_id']);
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $item['quantity'],
                'price' => $product->price,
            ]);
            $total += $product->price * $item['quantity'];
        }

        $order->update(['total_price' => $total]);

        return response()->json($order->load('items.product'), 201);
    }

    // Annuler sa propre commande
    public function cancelOrder(Request $request, Order $order)
    {
        if ($order->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $order->update(['status' => 'CANCELLED']);

        return response()->json(['message' => 'Commande annulée']);
    }
}
