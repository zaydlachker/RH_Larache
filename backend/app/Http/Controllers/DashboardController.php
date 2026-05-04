<?php

namespace App\Http\Controllers;

use App\Models\Concours;
use App\Models\Candidature;
use App\Models\Candidat;
use App\Models\Fonctionnaire;
use App\Models\Notation;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Display dashboard statistics
     */
    public function index(Request $request)
    {
        // Enforce basic RBAC: only admin RH can access dashboard stats.
        $user = $request->user();
        if (!$user || !method_exists($user, 'isAdmin') || !$user->isAdmin()) {
            return response()->json(['message' => 'Forbidden. Admins only.'], 403);
        }

        $stats = [
            'total_concours' => Concours::count(),
            'total_candidats' => Candidat::count(),
            'total_candidatures' => Candidature::count(),
            'total_fonctionnaires' => Fonctionnaire::count(),
            'total_notations' => Notation::count(),
            
            // Candidatures by status
            'candidatures_pending' => Candidature::where('status', 'pending')->count(),
            'candidatures_accepted' => Candidature::where('status', 'accepted')->count(),
            'candidatures_rejected' => Candidature::where('status', 'rejected')->count(),
            'candidatures_waitlisted' => Candidature::where('status', 'waitlisted')->count(),
            
            // Recent data
            'recent_concours' => Concours::with('createdBy')
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get(),
            'recent_candidatures' => Candidature::with(['candidat.user', 'concours'])
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get(),
        ];

        return response()->json($stats, 200);
    }
}
