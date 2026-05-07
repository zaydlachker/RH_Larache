<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class ArreteController extends Controller
{
    public function generate(Request $request, $type)
    {
        $data = $request->all();
        
        // Mapping types to blade files
        $mapping = [
            'arrete_titularisation' => 'arrete_titularisation',
            'arrete_recruter'       => 'arrete_recruter',
            'arrete_reclassement'   => 'arrete_reclassement',
            'arrete_nomination'     => 'arrete_nomination',
            'arrete_avancement'     => 'arrete_avancement',
            'notation'              => 'notation',
        ];

        if (!isset($mapping[$type])) {
            return response()->json(['error' => 'Type d\'arrêté invalide'], 400);
        }

        $view = $mapping[$type];
        
        // If the files are in resources/views/arretes/
        if (view()->exists("arretes.$view")) {
            $view = "arretes.$view";
        }

        $pdf = Pdf::loadView($view, $data);
        return $pdf->download($type . '.pdf');
    }
}
