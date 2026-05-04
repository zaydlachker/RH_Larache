<?php

namespace App\Http\Controllers;

use App\Models\Candidature;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CandidatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Candidature::query();
        
        if ($request->has('candidat_id')) {
            $query->where('candidat_id', $request->candidat_id);
        }
        
        if ($request->has('concours_id')) {
            $query->where('concours_id', $request->concours_id);
        }
        
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        $candidatures = $query->orderBy('submission_date', 'desc')->paginate(15);
        
        return response()->json($candidatures, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $user = $request->user();
            
            // If guest provided email, find or create user
            if (!$user && $request->email) {
                $user = \App\Models\User::firstOrCreate(
                    ['email' => $request->email],
                    [
                        'name' => $request->name ?? 'Candidat',
                        'password' => \Hash::make('password'),
                        'role' => 'candidat'
                    ]
                );
            }

            if (!$user) {
                return response()->json(['message' => 'Authentification requise.'], 401);
            }
            
            // Ensure user has a candidat profile
            $candidat = $user->candidat;
            if (!$candidat) {
                $candidat = \App\Models\Candidat::create([
                    'user_id' => $user->id,
                    'cin' => $request->cin ?? 'CIN-' . str_pad($user->id, 6, '0', STR_PAD_LEFT),
                ]);
            }

            // Sync user role to candidat (strict role system)
            if ($user->role !== 'admin' && $user->role !== 'fonctionnaire') {
                $user->update(['role' => 'candidat']);
            }

            // Validation
            $request->validate([
                'concours_id' => 'required',
            ]);

            $concours_id = $request->concours_id;
            
            // Handle placeholder or missing concours
            if (!is_numeric($concours_id) || !\App\Models\Concours::where('id', $concours_id)->exists()) {
                $concours = \App\Models\Concours::orderBy('created_at', 'desc')->first();
                if (!$concours) {
                    return response()->json(['message' => 'Aucun concours disponible pour le moment.'], 422);
                }
                $concours_id = $concours->id;
            }

            // Prevent duplicate applications
            $exists = Candidature::where('candidat_id', $candidat->id)
                ->where('concours_id', $concours_id)
                ->exists();
                
            if ($exists) {
                return response()->json(['message' => 'Vous avez déjà postulé à ce concours.'], 422);
            }

            $candidature = Candidature::create([
                'candidat_id' => $candidat->id,
                'concours_id' => $concours_id,
                'submission_date' => now(),
                'status' => 'pending',
                'notes' => $request->notes ?? 'Candidature via portail public',
            ]);

            return response()->json($candidature, 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Données invalides', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            \Log::error('Candidature Error: ' . $e->getMessage());
            return response()->json(['message' => 'Une erreur est survenue lors de la soumission.'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Candidature $candidature)
    {
        $candidature->load(['candidat', 'concours']);
        
        return response()->json($candidature, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Candidature $candidature)
    {
        $validated = $request->validate([
            'status' => 'sometimes|in:pending,accepted,rejected,waitlisted',
            'notes' => 'nullable|string',
        ]);

        $candidature->update($validated);

        if (isset($validated['status'])) {
            if ($validated['status'] === 'accepted') {
                $candidature->load('candidat.user');
                if ($candidature->candidat && $candidature->candidat->user) {
                    $candidature->candidat->user->update(['role' => 'fonctionnaire']);
                }
            } elseif ($validated['status'] === 'rejected') {
                // Keep user role as candidat or whatever it is, no action needed for rejected.
            }
        }

        return response()->json($candidature, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Candidature $candidature)
    {
        $candidature->delete();
        
        return response()->json(['message' => 'Candidature deleted successfully'], 200);
    }

    /**
     * Get candidatures by candidat
     */
    public function byCandidat($candidatId)
    {
        $candidatures = Candidature::where('candidat_id', $candidatId)
            ->with('concours')
            ->orderBy('submission_date', 'desc')
            ->paginate(15);
            
        return response()->json($candidatures, 200);
    }
}
