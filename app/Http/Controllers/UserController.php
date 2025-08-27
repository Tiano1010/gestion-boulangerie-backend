<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    // Lister tous les utilisateurs
    public function index()
    {
        return User::all();
    }

    // Créer un utilisateur
    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users',
            'password' => ['required', 'confirmed', Password::defaults()],
            'role'     => 'required|in:ADMIN,EMPLOYEE,CLIENT',
            'phone'    => 'nullable|string|max:20',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => $request->password, // Laravel 11 hash auto
            'role'     => $request->role,
            'phone'    => $request->phone,
        ]);

        return response()->json($user, 201);
    }

    // Voir un utilisateur spécifique
    public function show(User $user)
    {
        return response()->json($user);
    }

    // Mettre à jour un utilisateur
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name'  => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'role'  => 'sometimes|required|in:ADMIN,EMPLOYEE,CLIENT',
            'phone' => 'nullable|string|max:20',
        ]);

        if ($request->password) {
            $request->validate(['password' => ['confirmed', Password::defaults()]]);
            $user->password = $request->password;
        }

        $user->update($request->only('name', 'email', 'role', 'phone'));

        return response()->json($user);
    }

    // Supprimer un utilisateur
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'Utilisateur supprimé']);
    }
}
