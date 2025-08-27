<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Address;

class AddressController extends Controller
{
    // Lister les adresses du client
    public function index(Request $request)
    {
        $user = $request->user();
        $addresses = $user->addresses()->get();

        // = Address::where('user_id', $user->id)->get();
        return response()->json($addresses);
    }

    // Créer une adresse
    public function store(Request $request)
    {
        $request->validate([
            'label' => 'nullable|string|max:50',
            'street' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
            'country' => 'nullable|string|max:50',
        ]);

        $address = Address::create([
            'user_id' => $request->user()->id,
            'label' => $request->label,
            'street' => $request->street,
            'city' => $request->city,
            'postal_code' => $request->postal_code,
            'country' => $request->country ?? 'Sénégal',
        ]);

        return response()->json($address, 201);
    }

    // Afficher une adresse spécifique
    public function show(Request $request, Address $address)
    {
        if ($address->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($address);
    }

    // Mettre à jour une adresse
    public function update(Request $request, Address $address)
    {
        if ($address->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'label' => 'nullable|string|max:50',
            'street' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
            'country' => 'nullable|string|max:50',
        ]);

        $address->update($request->all());

        return response()->json($address);
    }

    // Supprimer une adresse
    public function destroy(Request $request, Address $address)
    {
        if ($address->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $address->delete();
        return response()->json(['message' => 'Adresse supprimée']);
    }
}
