<?php

namespace App\Http\Controllers;

use App\Models\Panier;
use App\Models\PanierProduit;
use Illuminate\Http\Request;

class PanierController extends Controller
{
    public function getPanier(Request $request)
    {
        $cart = Panier::firstOrCreate([
            'user_id' => $request->user()->id,
            'est_actif' => true
        ]);

        return response()->json($cart->load('items.product'));
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1'
        ]);

        $cart = Panier::firstOrCreate([
            'user_id'   => $request->user()->id,
            'est_actif' => true
        ]);

        // Vérifier si le produit est déjà dans le panier
        $item = PanierProduit::where('panier_id', $cart->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($item) {
            // ✅ Incrémenter la quantité existante
            $item->increment('quantity', $request->quantity);
        } else {
            // ✅ Créer une nouvelle entrée
            $item = PanierProduit::create([
                'panier_id'  => $cart->id,
                'product_id' => $request->product_id,
                'quantity'   => $request->quantity,
            ]);
        }

        return response()->json($item->load('product'));
    }

    public function remove(Request $request)
    {
        PanierProduit::where('panier_id', $request->cart_id)
            ->where('product_id', $request->product_id)
            ->delete();

        return response()->json(['message' => 'Produit retiré du panier']);
    }

    public function clearCart(Request $request)
    {
        $cart = Panier::where('user_id', $request->user()->id)->where('est_actif', true)->first();
        if ($cart) {
            $cart->items()->delete();
        }
        return response()->json(['message' => 'Panier vidé']);
    }
}
