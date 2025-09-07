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

        $query = Order::with(['user:id,name,email,role,matricule', 'items.product:id,name,price', 'address'])
            ->latest();

        if ($user->role !== 'ADMIN') {
            $query->where('user_id', $user->id);
        }

        return response()->json([
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
            // Génération du code commande
            $lastOrderId = Order::max('id') ?? 0;
            $orderCode = 'CMD-' . str_pad($lastOrderId + 1, 6, '0', STR_PAD_LEFT);

            // Matricule client
            $order = Order::create([
                'user_id'        => $user->id,
                'address_id'     => $address->id,
                'status'         => Order::STATUS_PENDING,
                'payment_status' => Order::PAYMENT_PENDING,
                'total_price'    => 0,
                'order_code'     => $orderCode,
            ]);
            $clientMatricule = $user->matricule;
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
                'data' => $order->load(['items.product:id,name,price', 'user:id,name,email,matricule', 'address'])
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
            'data'   => $order->load(['items.product:id,name,price', 'user:id,name,email,matricule', 'address'])
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
            'data'   => $order->fresh()->load(['items.product:id,name,price', 'user:id,name,email,matricule', 'address'])
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
                'data'   => $order->fresh()->load(['items.product:id,name,price', 'user:id,name,email,matricule', 'address'])
            ]);
        });
    }

    public function statuses(): JsonResponse
    {
        return response()->json([
            'data'   => [
                'fulfillment' => Order::FULFILLMENT_STATUSES,
                'payment'     => Order::PAYMENT_STATUSES,
            ]
        ]);
    }
    public function updatePaymentStatus(Request $request, Order $order): JsonResponse
    {
        $user = $request->user();

        // Vérif : l'admin OU le client propriétaire peut mettre à jour
        if ($user->role !== 'ADMIN' && $order->user_id !== $user->id) {
            return response()->json(['status' => 'error', 'message' => 'Unauthorized'], 403);
        }

        // Validation du statut de paiement
        $request->validate([
            'payment_status' => 'required|in:' . implode(',', Order::PAYMENT_STATUSES),
        ]);

        // Mise à jour du statut de paiement
        $order->update(['payment_status' => $request->payment_status]);

        return response()->json([
            'data' => $order->fresh()->load(['items.product:id,name,price', 'user:id,name,email,matricule', 'address'])
        ]);
    }

}
