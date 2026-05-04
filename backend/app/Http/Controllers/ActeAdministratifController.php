<?php

namespace App\Http\Controllers;

use App\Models\ActeAdministratif;
use App\Models\Candidat;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ActeAdministratifController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ActeAdministratif::query();
        
        if ($request->has('candidat_id')) {
            $query->where('candidat_id', $request->candidat_id);
        }
        
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }
        
        $actes = $query->with(['candidat', 'generator'])->orderBy('issue_date', 'desc')->paginate(15);
        
        return response()->json($actes, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'candidat_id' => 'required|exists:candidats,id',
            'type' => 'required|in:certificat,attestation,decision,contrat',
            'reference' => 'required|string|unique:acte_administratifs,reference',
            'description' => 'nullable|string',
            'issue_date' => 'required|date',
        ]);

        $validated['generated_by'] = $request->user()->id;
        
        // Initially empty file_path, will be populated after PDF generation
        $validated['file_path'] = null;

        $acte = ActeAdministratif::create($validated);

        return response()->json($acte->load(['candidat', 'generator']), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ActeAdministratif $acte_administratif)
    {
        $acte_administratif->load(['candidat', 'generator']);
        
        return response()->json($acte_administratif, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ActeAdministratif $acte_administratif)
    {
        $validated = $request->validate([
            'type' => 'sometimes|in:certificat,attestation,decision,contrat',
            'reference' => 'sometimes|string|unique:acte_administratifs,reference,' . $acte_administratif->id,
            'description' => 'nullable|string',
            'issue_date' => 'sometimes|date',
        ]);

        $acte_administratif->update($validated);

        return response()->json($acte_administratif, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ActeAdministratif $acte_administratif)
    {
        // Delete associated PDF file
        if ($acte_administratif->file_path && Storage::exists($acte_administratif->file_path)) {
            Storage::delete($acte_administratif->file_path);
        }
        
        $acte_administratif->delete();
        
        return response()->json(['message' => 'Acte administratif deleted successfully'], 200);
    }

    /**
     * Download the PDF document
     */
    public function download(ActeAdministratif $acte_administratif)
    {
        if (!$acte_administratif->file_path || !Storage::exists($acte_administratif->file_path)) {
            return response()->json(['message' => 'PDF file not found'], 404);
        }

        $file = Storage::get($acte_administratif->file_path);
        $filename = basename($acte_administratif->file_path);

        return response($file, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }

    /**
     * Generate a certificate PDF for a candidate
     */
    public function generateCertificat(Request $request, $candidatId)
    {
        $candidat = Candidat::with('user')->findOrFail($candidatId);
        
        $validated = $request->validate([
            'type' => 'required|in:certificat,attestation',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        // Generate unique reference
        $reference = Str::upper($validated['type'] . '_' . $candidat->cin . '_' . time());

        // Generate PDF content
        $pdf = PDF::loadView('pdf.certificat', [
            'candidat' => $candidat,
            'title' => $validated['title'],
            'content' => $validated['content'],
            'reference' => $reference,
            'issue_date' => now(),
            'generator' => $request->user(),
        ]);

        // Save PDF to storage
        $filename = 'certificates/' . $reference . '.pdf';
        Storage::put($filename, $pdf->output());

        // Create acte administratif record
        $acte = ActeAdministratif::create([
            'candidat_id' => $candidat->id,
            'type' => $validated['type'],
            'reference' => $reference,
            'file_path' => $filename,
            'issue_date' => now(),
            'generated_by' => $request->user()->id,
            'description' => $validated['content'],
        ]);

        return response()->json($acte->load(['candidat', 'generator']), 201);
    }
}
