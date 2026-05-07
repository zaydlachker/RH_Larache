<?php

namespace App\Services;

use App\Models\ActeAdministratif;
use App\Models\Fonctionnaire;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ArreteService
{
    /**
     * Generate and store a complete Arrete.
     */
    public function createAndGenerate($type, array $input, User $admin)
    {
        // 1. Fetch Employee
        $employee = null;
        if (isset($input['employee_id'])) {
            $employee = Fonctionnaire::with('user')->find($input['employee_id']);
        }

        // 2. Prepare Reference
        $reference = $input['reference'] ?? 'RH-' . strtoupper(Str::random(8));

        // 3. Construct Data Object
        $decisionData = $input['data'] ?? [];
        
        // 4. Save to Database (Source of Truth)
        $acte = ActeAdministratif::create([
            'fonctionnaire_id' => $employee ? $employee->id : null,
            'type'            => $type,
            'data'            => $decisionData,
            'reference'       => $reference,
            'issue_date'      => now(),
            'generated_by'    => $admin->id,
            'description'     => $input['description'] ?? "Génération d'un arrêté de type $type",
            'file_path'       => "arretes/{$type}_{$reference}.pdf",
        ]);

        // 5. Generate PDF from DB record (Mapping Logic)
        return $this->generatePdf($acte);
    }

    /**
     * Generate PDF from a stored ActeAdministratif.
     */
    public function generatePdf(ActeAdministratif $acte)
    {
        $type = $acte->type;
        $data = $acte->data;
        $fonctionnaire = $acte->fonctionnaire ? $this->normalizeFonctionnaire($acte->fonctionnaire) : null;

        // Enhance data with common aliases used in Blade templates
        $data['reference'] = $acte->reference;
        $data['reference_acte'] = $acte->reference;
        $data['acte_reference'] = $acte->reference;
        $data['date_acte'] = $acte->issue_date->format('d/m/Y');
        $data['date_decision'] = $acte->issue_date->format('d/m/Y');
        $data['date_redaction'] = $acte->issue_date->format('d/m/Y');
        $data['date_formatted'] = $acte->issue_date->format('d/m/Y');
        $data['signataire'] = 'رئيس جماعة العرائش';
        $data['annee'] = $acte->issue_date->format('Y');

        // Map to specific names used in blades
        $data_obj = (object) $data;

        $viewData = [
            'fonctionnaire'   => $fonctionnaire,
            'acte'            => $acte,
            'recrutement'     => $data_obj,
            'titularisation'  => $data_obj,
            'avancement'      => $data_obj,
            'reclassement'    => $data_obj,
            'contenu'         => $data,
            'date_formatted'  => $acte->issue_date->format('d/m/Y'),
        ];

        $view = "arretes.$type";
        if (!view()->exists($view)) {
            $view = "arretes.arrete_avancement"; // Fallback
        }

        return Pdf::loadView($view, $viewData);
    }

    /**
     * Normalize fonctionnaire data for Blade views.
     */
    private function normalizeFonctionnaire(Fonctionnaire $f)
    {
        $obj = new \stdClass();
        $obj->nom = $f->user->name;
        $obj->prenom = ''; // Split logic if needed
        $parts = explode(' ', $f->user->name);
        if (count($parts) > 1) {
            $obj->prenom = array_shift($parts);
            $obj->nom = implode(' ', $parts);
        }
        
        $obj->matricule = $f->matricule;
        $obj->cin = $f->cin ?? '........';
        $obj->cnie = $f->cin ?? '........';
        $obj->date_naissance = $f->birth_date ?? '........';
        $obj->lieu_naissance = $f->birth_place ?? '........';
        $obj->telephone = $f->phone ?? '........';
        $obj->situation_familiale = $f->family_status ?? '........';
        $obj->email = $f->user->email;
        $obj->grade = $f->position; // Assuming position is grade for now
        $obj->service = $f->department;
        $obj->direction = $f->department;
        $obj->date_recrutement = $f->hire_date;
        
        // Nested objects for specific views
        $obj->gradeActuel = (object) ['intitule' => $obj->grade];
        $obj->echelonActuel = (object) ['numero' => '..'];

        return $obj;
    }
}
