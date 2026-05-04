<?php

namespace App\Http\Controllers;

use App\Models\Concours;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ConcoursController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Concours::query();
        
        // Filter by status if provided
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        $concours = $query->orderBy('exam_date', 'desc')->paginate(15);
        
        return response()->json($concours, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'exam_date' => 'required|date',
                'application_deadline' => 'required|date',
                'max_participants' => 'nullable|integer|min:1',
                'status' => 'sometimes|string|in:upcoming,open,closed,cancelled',
            ]);

            $validated['created_by'] = $request->user()->id;
            
            if (!isset($validated['status'])) {
                $validated['status'] = $request->status ?? 'upcoming';
            }

            $concours = Concours::create($validated);

            return response()->json($concours, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Concours creation error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la création du concours: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Concours $concours)
    {
        $concours->load('candidatures.candidat', 'createdBy');
        
        return response()->json($concours, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Concours $concours)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'exam_date' => 'sometimes|date',
            'application_deadline' => 'sometimes|date',
            'status' => 'sometimes|in:upcoming,open,closed,cancelled',
            'max_participants' => 'nullable|integer|min:1',
        ]);

        $concours->update($validated);

        return response()->json($concours, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Concours $concours)
    {
        $concours->delete();
        
        return response()->json(['message' => 'Concours deleted successfully'], 200);
    }
}
