<?php

namespace App\Http\Controllers;

use App\Models\Notation;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class NotationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Notation::query();
        
        if ($request->has('fonctionnaire_id')) {
            $query->where('fonctionnaire_id', $request->fonctionnaire_id);
        }
        
        if ($request->has('date_from')) {
            $query->where('notation_date', '>=', $request->date_from);
        }
        
        if ($request->has('date_to')) {
            $query->where('notation_date', '<=', $request->date_to);
        }
        
        $notations = $query->with(['fonctionnaire.user', 'evaluator'])->orderBy('notation_date', 'desc')->paginate(15);
        
        return response()->json($notations, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'fonctionnaire_id' => 'required|exists:fonctionnaires,id',
            'notation_date' => 'required|date',
            'score' => 'required|numeric|min:0|max:100',
            'comments' => 'nullable|string',
        ]);

        $validated['evaluated_by'] = $request->user()->id;

        $notation = Notation::create($validated);

        return response()->json($notation->load(['fonctionnaire', 'evaluator']), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Notation $notation)
    {
        $notation->load(['fonctionnaire.user', 'evaluator']);
        
        return response()->json($notation, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Notation $notation)
    {
        $validated = $request->validate([
            'score' => 'sometimes|numeric|min:0|max:100',
            'comments' => 'nullable|string',
        ]);

        $notation->update($validated);

        return response()->json($notation, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notation $notation)
    {
        $notation->delete();
        
        return response()->json(['message' => 'Notation deleted successfully'], 200);
    }

    /**
     * Get notations by fonctionnaire
     */
    public function byFonctionnaire($fonctionnaireId)
    {
        $notations = Notation::where('fonctionnaire_id', $fonctionnaireId)
            ->with('evaluator')
            ->orderBy('notation_date', 'desc')
            ->paginate(15);
            
        return response()->json($notations, 200);
    }
}
