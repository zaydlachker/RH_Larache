<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ActeAdministratif;
use App\Models\User;
use App\Services\ArreteService;

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
        $request->validate([
            'employee_id' => 'required|exists:fonctionnaires,id',
        ]);

        $admin = auth()->user() ?? User::where('role', 'admin')->first();
        
        $result = $this->arreteService->createAndGenerate($type, $request->all(), $admin);
        
        $acte = $result['acte'];
        $pdf = $result['pdf'];
        
        return $pdf->download("{$type}_{$acte->reference}.pdf");
    }
    public function download($id)
    {
        $acte = ActeAdministratif::findOrFail($id);
        return $this->arreteService->generatePdf($acte)->download($acte->type . '_' . $acte->id . '.pdf');
    }
}
