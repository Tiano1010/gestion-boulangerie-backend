<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $query = Order::with(['user:id,name,email,role', 'items.product:id,name,price', 'address'])
            ->latest();

        if ($user->role !== 'ADMIN') {
            $query->where('user_id', $user->id);
        }

        return response()->json([
            'status' => 'success',
            'data'   => $query->get()
        ]);
    }

    public function store(StoreOrderRequest $request): JsonResponse
    {
        $user = $request->user();
        $payloadItems = collect($request->input('items', []));
        $addressId = $request->input('address_id');

        $address = $user->addresses()->findOrFail($addressId);

        $productIds = $payloadItems->pluck('product_id')->all();
        $products = Product::whereIn('id', $productIds)->get()->keyBy('id');

        return DB::transaction(function () use ($user, $payloadItems, $products, $address) {
            $order = Order::create([
                'user_id'        => $user->id,
                'address_id'     => $address->id,
                'status'         => Order::STATUS_PENDING,
                'payment_status' => Order::PAYMENT_PENDING,
                'total_price'    => 0,
            ]);

            $total = 0;

            foreach ($payloadItems as $it) {
                $product = $products[$it['product_id']];

                if ($product->stock < $it['quantity']) {
                    abort(422, "Stock insuffisant pour le produit: {$product->name}");
                }

                $unitPrice = $product->price;
                $lineTotal = $unitPrice * $it['quantity'];
                $total += $lineTotal;

                OrderItem::create([
                    'order_id'   => $order->id,
                    'product_id' => $product->id,
                    'quantity'   => $it['quantity'],
                    'price'      => $unitPrice,
                ]);

                $product->decrement('stock', $it['quantity']);
            }

            $order->update(['total_price' => $total]);

            return response()->json([
                'status' => 'success',
                'data'   => $order->load(['items.product:id,name,price', 'user:id,name,email', 'address'])
            ], 201);
        });
    }

    public function show(Request $request, Order $order): JsonResponse
    {
        $user = $request->user();

        if ($user->role !== 'ADMIN' && $order->user_id !== $user->id) {
            return response()->json(['status' => 'error', 'message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'status' => 'success',
            'data'   => $order->load(['items.product:id,name,price', 'user:id,name,email', 'address'])
        ]);
    }

    public function updateStatus(Request $request, Order $order): JsonResponse
    {
        $user = $request->user();

        if ($user->role !== 'ADMIN') {
            return response()->json(['status' => 'error', 'message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'status' => 'required|in:' . implode(',', Order::FULFILLMENT_STATUSES),
        ]);

        $order->update(['status' => $request->status]);

        return response()->json([
            'status' => 'success',
            'data'   => $order->fresh()->load(['items.product:id,name,price', 'user:id,name,email', 'address'])
        ]);
    }

    public function cancel(Request $request, Order $order): JsonResponse
    {
        $user = $request->user();

        if ($user->role !== 'ADMIN' && $order->user_id !== $user->id) {
            return response()->json(['status' => 'error', 'message' => 'Unauthorized'], 403);
        }

        if ($order->status === Order::STATUS_CANCELLED) {
            return response()->json(['status' => 'error', 'message' => 'Déjà annulée'], 422);
        }

        return DB::transaction(function () use ($order) {
            foreach ($order->items as $item) {
                $item->product->increment('stock', $item->quantity);
            }

            $order->update(['status' => Order::STATUS_CANCELLED]);

            return response()->json([
                'status' => 'success',
                'data'   => $order->fresh()->load(['items.product:id,name,price', 'user:id,name,email', 'address'])
            ]);
        });
    }

    public function statuses(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data'   => [
                'fulfillment' => Order::FULFILLMENT_STATUSES,
                'payment'     => Order::PAYMENT_STATUSES,
            ]
        ]);
    }
}
