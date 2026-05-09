<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ActeAdministratif;
use App\Models\User;
use App\Services\ArreteService;
use Illuminate\Support\Facades\Log;

class ArreteController extends Controller
{
    protected $arreteService;

    public function __construct(ArreteService $arreteService)
    {
        $this->arreteService = $arreteService;
    }

    public function index()
    {
        return ActeAdministratif::with('fonctionnaire.user')->latest()->get();
    }

    public function generate(Request $request, $type)
    {
        Log::info("Full Request Payload for $type:", $request->all());

        // Strict Validation based on Type
        $rules = [
            'employee_id' => 'required|exists:fonctionnaires,id',
            'title' => 'required|string',
            'data.date_effet' => 'required|date',
        ];

        // Sanitize input: convert empty strings to null
        $input = $request->all();
        array_walk_recursive($input, function (&$item) {
            if ($item === '') $item = null;
        });
        $request->merge($input);

        if ($type === 'recrutement') {
            $rules['data.diplome'] = 'required|string';
            $rules['data.new_grade'] = 'required|string';
        }

        try {
            $validated = $request->validate($rules);
            Log::info("Validation réussie pour $type", ['employee_id' => $validated['employee_id']]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::warning("Échec de la validation pour $type", [
                'errors' => $e->errors(),
                'payload' => $request->all()
            ]);
            return response()->json([
                'message' => 'Erreur de validation: sélection de l\'employé invalide ou données manquantes.',
                'errors' => $e->errors()
            ], 422);
        }

        try {
            $admin = auth()->user() ?? User::where('role', 'admin')->first();
            
            $result = $this->arreteService->createAndGenerate($type, $request->all(), $admin);
            
            $acte = $result['acte'];
            $pdf = $result['pdf'];
            
            if (ob_get_length()) ob_end_clean();
            return $pdf->stream("{$type}_{$acte->reference}.pdf");
        } catch (\Exception $e) {
            $errorDetail = [
                'message' => $e->getMessage(),
                'file'    => $e->getFile(),
                'line'    => $e->getLine(),
                'trace'   => explode("\n", $e->getTraceAsString())
            ];

            Log::error("CRITICAL PDF FAILURE [$type]:", array_merge($errorDetail, ['request' => $request->all()]));
            
            return response()->json([
                'message' => 'Erreur lors de la génération du document: ' . $e->getMessage(),
                'errors'  => $errorDetail
            ], 500);
        }
    }

    /**
     * Backend-only test route to bypass frontend and identify root causes.
     */
    public function test($type)
    {
        Log::info("DEBUG: Starting backend-only PDF test for type: $type");
        
        try {
            $employee = \App\Models\Fonctionnaire::first();
            if (!$employee) {
                return response()->json(['error' => 'No employees found in database to test with.'], 404);
            }

            $admin = User::where('role', 'admin')->first() ?? User::first();
            
            $testData = [
                'employee_id' => $employee->id,
                'title'       => "TEST PDF - " . strtoupper($type),
                'description' => "Test generation automatically triggered by backend debug route.",
                'data'        => [
                    'date_effet'   => now()->format('Y-m-d'),
                    'new_grade'    => 'Grade Test',
                    'echelle'      => '10',
                    'echelon'      => '1',
                    'diplome'      => 'Diplôme Test',
                    'date_concours' => '2024-01-01'
                ]
            ];

            $result = $this->arreteService->createAndGenerate($type, $testData, $admin);
            if (ob_get_length()) ob_end_clean();
            return $result['pdf']->stream("test_{$type}.pdf");

        } catch (\Exception $e) {
            return response()->json([
                'status'  => 'DEBUG_FAILURE',
                'message' => $e->getMessage(),
                'file'    => $e->getFile(),
                'line'    => $e->getLine(),
                'trace'   => explode("\n", $e->getTraceAsString())
            ], 500);
        }
    }

    public function download($id)
    {
        $acte = ActeAdministratif::findOrFail($id);
        return $this->arreteService->generatePdf($acte)->download($acte->type . '_' . $acte->id . '.pdf');
    }
}
