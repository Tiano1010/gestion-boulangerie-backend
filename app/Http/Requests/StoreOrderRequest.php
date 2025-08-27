<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Order;

class StoreOrderRequest extends FormRequest
{
    /**
     * Détermine si l'utilisateur est autorisé à faire cette requête.
     */
    public function authorize(): bool
    {
        // L'utilisateur doit être authentifié pour créer une commande
        return $this->user() !== null;
    }

    /**
     * Règles de validation pour la création d'une commande.
     */
    public function rules(): array
    {
        return [
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'address_id' => 'required|exists:addresses,id',

            // Optionnel : si on veut permettre de définir le statut initial
            'status' => 'sometimes|in:' . implode(',', Order::FULFILLMENT_STATUSES),
            'payment_status' => 'sometimes|in:' . implode(',', Order::PAYMENT_STATUSES),
        ];
    }

    /**
     * Messages d'erreur personnalisés.
     */
    public function messages(): array
    {
        return [
            'items.required' => 'La commande doit contenir au moins un produit.',
            'items.array' => 'Le champ items doit être un tableau.',
            'items.min' => 'La commande doit contenir au moins un produit.',
            'items.*.product_id.required' => 'Chaque produit doit avoir un ID.',
            'items.*.product_id.exists' => 'Le produit sélectionné est invalide.',
            'items.*.quantity.required' => 'Chaque produit doit avoir une quantité.',
            'items.*.quantity.integer' => 'La quantité doit être un nombre entier.',
            'items.*.quantity.min' => 'La quantité doit être au moins 1.',
            'address_id.required' => 'Une adresse de livraison est obligatoire.',
            'address_id.exists' => 'L\'adresse sélectionnée est invalide.',
            'status.in' => 'Le statut de la commande est invalide.',
            'payment_status.in' => 'Le statut du paiement est invalide.',
        ];
    }
}
