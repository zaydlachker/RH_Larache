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
            $employee = \App\Models\Fonctionnaire::with('user')->find($input['employee_id']);
        }

        // 2. Prepare Reference
        $reference = $input['reference'] ?? 'RH-' . strtoupper(Str::random(8));

        // 3. Construct Data Object
        $decisionData = $input['data'] ?? [];
        
        // 4. Save Specific Record (User Link Fix & Database Save Fix)
        $recordId = null;
        $recordType = null;

        if ($employee) {
            switch ($type) {
                case 'arrete_titularisation':
                    $record = \App\Models\TitularisationRecord::create([
                        'fonctionnaire_id' => $employee->id,
                        'grade' => $decisionData['new_grade'] ?? $employee->grade,
                        'date_effet' => $decisionData['date_effet'] ?? now()->format('Y-m-d'),
                        'reference' => $reference,
                    ]);
                    $recordId = $record->id;
                    $recordType = \App\Models\TitularisationRecord::class;
                    break;
                case 'arrete_recruter':
                    $record = \App\Models\RecrutementRecord::create([
                        'fonctionnaire_id' => $employee->id,
                        'diplome' => $decisionData['diplome'] ?? $employee->diplome ?? '...',
                        'specialite' => $decisionData['specialite'] ?? '...',
                        'grade' => $decisionData['new_grade'] ?? $employee->grade,
                        'date_recrutement' => $decisionData['date_effet'] ?? $employee->hire_date ?? now()->format('Y-m-d'),
                        'reference' => $reference,
                    ]);
                    $recordId = $record->id;
                    $recordType = \App\Models\RecrutementRecord::class;
                    break;
                case 'arrete_reclassement':
                    $record = \App\Models\ReclassementRecord::create([
                        'fonctionnaire_id' => $employee->id,
                        'ancien_grade' => $employee->grade ?? $employee->position,
                        'nouveau_grade' => $decisionData['new_grade'] ?? '...',
                        'date_effet' => $decisionData['date_effet'] ?? now()->format('Y-m-d'),
                        'reference' => $reference,
                    ]);
                    $recordId = $record->id;
                    $recordType = \App\Models\ReclassementRecord::class;
                    break;
                case 'arrete_avancement':
                    $record = \App\Models\AvancementRecord::create([
                        'fonctionnaire_id' => $employee->id,
                        'ancien_echelon' => $employee->echelon ?? '...',
                        'nouvel_echelon' => $decisionData['echelon'] ?? '...',
                        'nouveau_grade' => $decisionData['new_grade'] ?? $employee->grade,
                        'date_effet' => $decisionData['date_effet'] ?? now()->format('Y-m-d'),
                        'avis_superieur' => $input['description'] ?? '...',
                        'avis_chef' => '...',
                        'avis_admin' => '...',
                        'reference' => $reference,
                    ]);
                    $recordId = $record->id;
                    $recordType = \App\Models\AvancementRecord::class;
                    break;
            }
        }

        // 5. Save to Database (Central Log)
        $acte = ActeAdministratif::create([
            'fonctionnaire_id' => $employee ? $employee->id : null,
            'type'            => $type,
            'title'           => $input['title'] ?? null,
            'data'            => $decisionData,
            'reference'       => $reference,
            'issue_date'      => now(),
            'generated_by'    => $admin->id,
            'description'     => $input['description'] ?? "Génération d'un arrêté de type $type",
            'file_path'       => "arretes/{$type}_{$reference}.pdf",
            'record_id'       => $recordId,
            'record_type'     => $recordType,
        ]);

        // 6. Generate PDF
        $pdf = $this->generatePdf($acte);

        return [
            'acte' => $acte,
            'pdf' => $pdf
        ];
    }

    /**
     * Generate PDF from a stored ActeAdministratif.
     */
    public function generatePdf(ActeAdministratif $acte)
    {
        $acte->load(['fonctionnaire.user', 'record']);
        
        $type = $acte->type;
        $data = $acte->data;
        $employee = $acte->fonctionnaire ? $this->normalizeFonctionnaire($acte->fonctionnaire) : null;
        $record = $acte->record;

        // Comprehensive mapping for ALL variables in Blade templates
        $mappedData = [
            'reference_acte' => $acte->reference,
            'reference'      => $acte->reference,
            'date_acte'      => $acte->issue_date->format('Y-m-d'),
            'date_formatted' => $acte->issue_date->format('d/m/Y'),
            'annee'          => date('Y', strtotime($data['date_effet'] ?? 'now')),
            'signataire'     => 'رئيس جماعة العرائش',
            'lieu_redaction' => 'العرائش',
            'grade_actuel'   => $employee->grade ?? '...',
            'echelon_actuel' => $employee->echelon ?? '...',
        ];

        // Specific mappings for each type to avoid empty placeholders
        if ($type === 'arrete_avancement') {
            $mappedData['nouveau_grade'] = $data['new_grade'] ?? '...';
            $mappedData['nouvel_echelon'] = $data['echelon'] ?? '...';
            $mappedData['date_effet'] = $data['date_effet'] ?? '...';
            $mappedData['description_missions'] = $acte->description;
            $mappedData['avis_superieur'] = 'موافق';
            $mappedData['avis_chef'] = 'موافق';
            $mappedData['avis_admin'] = 'موافق';
            $mappedData['decision'] = 'propose';
        } elseif ($type === 'arrete_titularisation') {
            $mappedData['new_grade'] = $data['new_grade'] ?? $employee->grade ?? '...';
            $mappedData['new_echelle'] = $data['echelle'] ?? '...';
            $mappedData['new_echelon'] = $data['echelon'] ?? '...';
            $mappedData['new_indice'] = $data['indice'] ?? '...';
            $mappedData['old_grade'] = $employee->grade ?? '...';
            $mappedData['old_echelle'] = '...';
            $mappedData['old_echelon'] = $employee->echelon ?? '...';
            $mappedData['old_indice'] = '...';
            $mappedData['date_effet'] = $data['date_effet'] ?? '...';
            $mappedData['duree_stage'] = '12 شهر';
        } elseif ($type === 'arrete_recruter') {
            $mappedData['diplome'] = $data['diplome'] ?? '...';
            $mappedData['specialite'] = $data['specialite'] ?? '...';
            $mappedData['date_diplome'] = '...';
            $mappedData['type_recrutement'] = 'concours';
            $mappedData['num_telegramme'] = '...';
            $mappedData['date_telegramme'] = '...';
            $mappedData['date_recrutement'] = $data['date_effet'] ?? '...';
            $mappedData['date_effet'] = $data['date_effet'] ?? '...';
            $mappedData['grade_recrutement'] = $data['new_grade'] ?? '...';
            $mappedData['echelle_recrutement'] = $data['echelle'] ?? '...';
            $mappedData['echelon_recrutement'] = $data['echelon'] ?? '...';
            $mappedData['indice_recrutement'] = $data['indice'] ?? '...';
            $mappedData['service_affectation'] = $employee->direction ?? '...';
        } elseif ($type === 'arrete_reclassement') {
            $mappedData['ancien_grade'] = $employee->grade ?? '...';
            $mappedData['nouveau_grade'] = $data['new_grade'] ?? '...';
            $mappedData['date_effet'] = $data['date_effet'] ?? '...';
        }

        $viewData = [
            'employee'        => $employee,
            'fonctionnaire'   => $employee,
            'record'          => $record,
            'acte'            => $acte,
            'contenu'         => $mappedData,
            'recrutement'     => (object) $mappedData,
            'titularisation'  => (object) $mappedData,
            'avancement'      => (object) $mappedData,
            'reclassement'    => (object) $mappedData,
            'date_formatted'  => $mappedData['date_formatted'],
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
        $obj->id = $f->id;
        $obj->nom = $f->user->name;
        $obj->prenom = ''; 
        $parts = explode(' ', $f->user->name);
        if (count($parts) > 1) {
            $obj->prenom = array_shift($parts);
            $obj->nom = implode(' ', $parts);
        }
        
        $obj->matricule = $f->matricule;
        $obj->cin = $f->cin ?? '........';
        $obj->cnie = $f->cin ?? '........';
        $obj->date_naissance = $f->date_naissance ?? '........';
        $obj->lieu_naissance = $f->lieu_naissance ?? '........';
        $obj->telephone = $f->phone ?? '........';
        $obj->situation_familiale = $f->statut ?? '........';
        $obj->email = $f->user->email;
        $obj->grade = $f->grade ?? $f->position;
        $obj->echelon = $f->echelon ?? '...';
        $obj->direction = $f->department ?? '...';
        $obj->date_recrutement = $f->hire_date ?? '...';
        
        $obj->gradeActuel = (object) ['intitule' => $obj->grade];
        $obj->echelonActuel = (object) ['numero' => $obj->echelon];

        return $obj;
    }
}
