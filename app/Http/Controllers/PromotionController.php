<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PromotionController extends Controller
{
    /**
     * Liste des promotions
     */
    public function index(): JsonResponse
    {
        $promotions = Promotion::with('products:id,name,price')->latest()->get();

        return response()->json($promotions);

    }

    /**
     * Créer une nouvelle promotion
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'discount' => 'required|numeric|min:0',
            'type' => 'required|in:FIXED,PERCENT',
            'start_at' => 'nullable|date',
            'end_at' => 'nullable|date|after_or_equal:start_at',
            'active' => 'boolean',
            'product_ids' => 'required|array|min:1',
            'product_ids.*' => 'exists:products,id',
        ]);

        $validated['active'] = $validated['active'] ?? false;

        // Créer la promotion
        $promotion = Promotion::create($validated);

        // Associer les produits
        $promotion->products()->sync($validated['product_ids']);

        return response()->json([
            'status' => 'success',
            'data' => $promotion->load('products:id,name,price')
        ], 201);
    }

    /**
     * Afficher une promotion
     */
    public function show(Promotion $promotion): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data' => $promotion->load('products:id,name,price')
        ]);
    }

    /**
     * Mettre à jour une promotion
     */
    public function update(Request $request, Promotion $promotion): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'discount' => 'sometimes|required|numeric|min:0',
            'type' => 'sometimes|required|in:FIXED,PERCENT',
            'start_at' => 'nullable|date',
            'end_at' => 'nullable|date|after_or_equal:start_at',
            'active' => 'boolean',
            'product_ids' => 'nullable|array|min:1',
            'product_ids.*' => 'exists:products,id',
        ]);

        // Conserver la valeur précédente si active n’est pas fournie
        if (!isset($validated['active'])) {
            $validated['active'] = $promotion->active ?? false;
        }

        $promotion->update($validated);

        if (isset($validated['product_ids'])) {
            $promotion->products()->sync($validated['product_ids']);
        }

        return response()->json([
            'status' => 'success',
            'data' => $promotion->load('products:id,name,price')
        ]);
    }

    /**
     * Supprimer une promotion
     */
    public function destroy(Promotion $promotion): JsonResponse
    {
        $promotion->products()->detach();
        $promotion->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Promotion supprimée avec succès'
        ]);
    }
}
