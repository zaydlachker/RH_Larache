<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
