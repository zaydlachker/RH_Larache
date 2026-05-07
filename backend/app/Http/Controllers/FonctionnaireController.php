<?php

namespace App\Http\Controllers;

use App\Models\Fonctionnaire;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class FonctionnaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Fonctionnaire::query();
        
        if ($request->has('department')) {
            $query->where('department', $request->department);
        }
        
        if ($request->has('search')) {
            $search = $request->search;
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }
        
        $fonctionnaires = $query->with('user')->orderBy('created_at', 'desc')->paginate(15);
        
        return response()->json($fonctionnaires, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'matricule' => 'required|string|unique:fonctionnaires,matricule',
            'statut' => 'required|string',
            'grade' => 'required|string',
            'echelle' => 'required|string',
            'echelon' => 'required|string',
            'anciennete' => 'required|string',
            'cin' => 'required|string',
            'phone' => 'required|string',
            'date_naissance' => 'required|date',
            'lieu_naissance' => 'required|string',
            'nationalite' => 'required|string',
            'diplome' => 'required|string',
            'department' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'hire_date' => 'required|date',
            'salary' => 'nullable|numeric|min:0',
        ]);

        return \Illuminate\Support\Facades\DB::transaction(function () use ($validated) {
            $user = \App\Models\User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => $validated['password'],
                'role' => 'fonctionnaire',
            ]);

            $fonctionnaireData = array_merge($validated, [
                'user_id' => $user->id,
                'position' => $validated['position'] ?? $validated['grade']
            ]);
            
            $fonctionnaire = Fonctionnaire::create($fonctionnaireData);

            return response()->json($fonctionnaire->load('user'), 201);
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Fonctionnaire $fonctionnaire)
    {
        $fonctionnaire->load(['user', 'notations.evaluator']);
        
        return response()->json($fonctionnaire, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Fonctionnaire $fonctionnaire)
    {
        $validated = $request->validate([
            'matricule' => 'sometimes|string|unique:fonctionnaires,matricule,' . $fonctionnaire->id,
            'department' => 'sometimes|string|max:255',
            'position' => 'sometimes|string|max:255',
            'hire_date' => 'sometimes|date',
            'salary' => 'nullable|numeric|min:0',
        ]);

        $fonctionnaire->update($validated);

        return response()->json($fonctionnaire, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fonctionnaire $fonctionnaire)
    {
        $fonctionnaire->delete();
        
        return response()->json(['message' => 'Fonctionnaire deleted successfully'], 200);
    }
}
