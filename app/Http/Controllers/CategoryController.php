<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Lister toutes les catégories
    public function index()
    {
        return response()->json(Category::all());
    }

    // Créer une catégorie
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:categories,name',
            'description' => 'nullable|string',
        ]);

        $category = Category::create($request->all());

        return response()->json($category, 201);
    }

    // Afficher une catégorie
    public function show(Category $category)
    {
        return response()->json($category);
    }

    // Mettre à jour une catégorie
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|unique:categories,name,' . $category->id,
            'description' => 'nullable|string',
        ]);

        $category->update($request->all());

        return response()->json($category);
    }

    // Supprimer une catégorie
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(['message' => 'Catégorie supprimée']);
    }
}
