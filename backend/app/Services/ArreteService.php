<?php

namespace App\Services;

use App\Models\ActeAdministratif;
use App\Models\Fonctionnaire;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ArreteService
{
    /**
     * Generate and store a complete Arrete within a transaction.
     */
    public function createAndGenerate($type, array $input, User $admin)
    {
        return DB::transaction(function () use ($type, $input, $admin) {
            Log::info("Début de la génération d'un document: $type", ['input' => $input]);

            // 1. Fetch Employee
            $employee = null;
            if (isset($input['employee_id'])) {
                $employee = \App\Models\Fonctionnaire::with('user')->find($input['employee_id']);
            }

            if (!$employee) {
                Log::error("Échec de la génération: Employé introuvable.", ['employee_id' => $input['employee_id'] ?? null]);
                throw new \Exception("Employé introuvable.");
            }

            // 2. Prepare Reference
            $reference = $input['reference'] ?? 'RH-' . strtoupper(Str::random(8));
            $decisionData = $input['data'] ?? [];
            
            // 3. Document Generation Logic
            $recordId = null;
            $recordType = null;

            switch ($type) {
                case 'recrutement':
                    $record = \App\Models\RecrutementRecord::create([
                        'fonctionnaire_id' => $employee->id,
                        'diplome'          => $decisionData['diplome'] ?? '-',
                        'specialite'       => $decisionData['specialite'] ?? '-',
                        'grade'            => $decisionData['new_grade'] ?? $employee->grade,
                        'date_recrutement' => $decisionData['date_effet'] ?? now(),
                        'reference'        => $reference,
                    ]);
                    $recordId = $record->id;
                    $recordType = \App\Models\RecrutementRecord::class;
                    break;
                case 'titularisation':
                    $record = \App\Models\TitularisationRecord::create([
                        'fonctionnaire_id' => $employee->id,
                        'grade'            => $decisionData['new_grade'] ?? $employee->grade,
                        'date_effet'       => $decisionData['date_effet'] ?? now(),
                        'reference'        => $reference,
                    ]);
                    $recordId = $record->id;
                    $recordType = \App\Models\TitularisationRecord::class;
                    break;
                case 'reclassement':
                    $record = \App\Models\ReclassementRecord::create([
                        'fonctionnaire_id' => $employee->id,
                        'ancien_grade'     => $employee->grade,
                        'nouveau_grade'    => $decisionData['new_grade'] ?? '-',
                        'date_effet'       => $decisionData['date_effet'] ?? now(),
                        'reference'        => $reference,
                    ]);
                    $recordId = $record->id;
                    $recordType = \App\Models\ReclassementRecord::class;
                    break;
                case 'avancement':
                    $record = \App\Models\AvancementRecord::create([
                        'fonctionnaire_id' => $employee->id,
                        'ancien_echelon'   => $employee->echelon,
                        'nouvel_echelon'   => $decisionData['echelon'] ?? '-',
                        'nouveau_grade'    => $decisionData['new_grade'] ?? $employee->grade,
                        'date_effet'       => $decisionData['date_effet'] ?? now(),
                        'reference'        => $reference,
                    ]);
                    $recordId = $record->id;
                    $recordType = \App\Models\AvancementRecord::class;
                    break;
            }

            // 4. Save to Database (Central Log)
            $acte = ActeAdministratif::create([
                'fonctionnaire_id' => $employee->id,
                'type'            => $type,
                'title'           => $input['title'] ?? "Acte Administratif - $type",
                'data'            => $decisionData,
                'reference'       => $reference,
                'issue_date'      => now(),
                'generated_by'    => $admin->id,
                'description'     => $input['description'] ?? "Génération d'un document de type $type",
                'file_path'       => "arretes/{$type}_{$reference}.pdf",
                'record_id'       => $recordId,
                'record_type'     => $recordType,
            ]);

            // 5. Generate PDF
            $pdf = $this->generatePdf($acte);

            Log::info("Document généré avec succès.", ['acte_id' => $acte->id, 'reference' => $reference]);

            return [
                'acte' => $acte,
                'pdf' => $pdf
            ];
        });
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
        $mappedData = array_merge($data, [
            'reference_acte' => $acte->reference,
            'reference'      => $acte->reference,
            'date_acte'      => $acte->issue_date->format('Y-m-d'),
            'date_formatted' => $acte->issue_date->format('d/m/Y'),
            'date_decision'  => $acte->issue_date->format('d/m/Y'),
            'annee'          => date('Y', strtotime($data['date_effet'] ?? 'now')),
            'signataire'     => 'رئيس جماعة العرائش',
            'lieu_redaction' => 'العرائش',
            'grade_actuel'   => $employee->grade ?? '...',
            'echelon_actuel' => $employee->echelon ?? '...',
            'nouveau_grade'  => $data['new_grade'] ?? '...',
            'nouvel_echelon' => $data['echelon'] ?? '...',
            'date_effet'     => $data['date_effet'] ?? '...',
            'date_prise_service' => $data['date_effet'] ?? '...',
            'description_missions' => $acte->description,
        ]);

        $viewData = [
            'employee'        => $employee,
            'fonctionnaire'   => $employee,
            'record'          => $record,
            'nomination'      => (object) $mappedData,
            'acte'            => $acte,
            'contenu'         => $mappedData,
            'recrutement'     => (object) $mappedData,
            'titularisation'  => (object) $mappedData,
            'avancement'      => (object) $mappedData,
            'reclassement'    => (object) $mappedData,
            'date_formatted'  => $mappedData['date_formatted'],
        ];

        // Strict Mapping as per Requirement
        $viewMap = [
            'recrutement'    => 'arretes.arrete_recrutement',
            'titularisation' => 'arretes.arrete_titularisation',
            'reclassement'   => 'arretes.arrete_reclassement',
            'avancement'     => 'arretes.arrete_avancement',
            'nomination'     => 'arretes.arrete_nomination',
        ];

        $view = $viewMap[$type] ?? 'arretes.arrete_avancement';

        // Safety Check: If employee is missing, we cannot proceed with administrative acts
        if (!$employee) {
            Log::error("Génération PDF impossible: Fonctionnaire non lié à l'acte.", ['acte_id' => $acte->id]);
            throw new \Exception("Données du fonctionnaire introuvables pour cet acte.");
        }

        // Log final data passed to Blade for debugging
        Log::info("Données finales passées au template Blade ($view):", [
            'type' => $type,
            'employee_name' => $employee->nom,
            'mapped_keys' => array_keys($mappedData)
        ]);

        try {
            // Ensure UTF-8 and valid HTML structure is handled by DomPDF via options if needed
            return Pdf::loadView($view, $viewData)->setPaper('a4', 'portrait');
        } catch (\Exception $e) {
            Log::error("DomPDF Rendering Error for $type:", [
                'message' => $e->getMessage(),
                'view' => $view,
                'acte_id' => $acte->id
            ]);
            throw new \Exception("Erreur de rendu PDF: " . $e->getMessage());
        }
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
        $obj->cin = $f->cin ?? '';
        $obj->cnie = $f->cin ?? '';
        $obj->date_naissance = $f->date_naissance ?? '';
        $obj->lieu_naissance = $f->lieu_naissance ?? '';
        $obj->telephone = $f->phone ?? '';
        $obj->situation_familiale = $f->statut ?? '';
        $obj->email = $f->user->email;
        $obj->grade = $f->grade ?? $f->position;
        $obj->echelon = $f->echelon ?? '';
        $obj->echelle = $f->echelle ?? '';
        $obj->indice = $f->indice ?? '';
        $obj->direction = $f->department ?? '';
        $obj->department = $f->department ?? '';
        $obj->date_recrutement = $f->hire_date ?? '';
        
        $obj->gradeActuel = (object) ['intitule' => $obj->grade];
        $obj->echelonActuel = (object) ['numero' => $obj->echelon];

        return $obj;
    }
}
