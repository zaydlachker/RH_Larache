<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TitularisationRecord extends Model
{
    protected $fillable = ['fonctionnaire_id', 'grade', 'date_effet', 'reference'];
    
    public function fonctionnaire()
    {
        return $this->belongsTo(Fonctionnaire::class);
    }
}

class RecrutementRecord extends Model
{
    protected $fillable = ['fonctionnaire_id', 'diplome', 'specialite', 'grade', 'date_recrutement', 'reference'];
    
    public function fonctionnaire()
    {
        return $this->belongsTo(Fonctionnaire::class);
    }
}

class ReclassementRecord extends Model
{
    protected $fillable = ['fonctionnaire_id', 'ancien_grade', 'nouveau_grade', 'date_effet', 'reference'];
    
    public function fonctionnaire()
    {
        return $this->belongsTo(Fonctionnaire::class);
    }
}

class AvancementRecord extends Model
{
    protected $fillable = [
        'fonctionnaire_id', 'ancien_echelon', 'nouvel_echelon', 'nouveau_grade', 
        'date_effet', 'avis_superieur', 'avis_chef', 'avis_admin', 'reference'
    ];
    
    public function fonctionnaire()
    {
        return $this->belongsTo(Fonctionnaire::class);
    }
}
