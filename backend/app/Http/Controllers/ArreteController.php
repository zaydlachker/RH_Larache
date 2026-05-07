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
        // For the purpose of this demo, we use the first admin if not authenticated
        $admin = auth()->user() ?? User::where('role', 'admin')->first();
        
        $pdf = $this->arreteService->createAndGenerate($type, $request->all(), $admin);
        
        return $pdf->download($type . '.pdf');
    }
    public function download($id)
    {
        $acte = ActeAdministratif::findOrFail($id);
        return $this->arreteService->generatePdf($acte)->download($acte->type . '_' . $acte->id . '.pdf');
    }
}
