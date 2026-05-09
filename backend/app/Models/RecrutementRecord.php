<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecrutementRecord extends Model
{
    protected $fillable = ['fonctionnaire_id', 'diplome', 'specialite', 'grade', 'date_recrutement', 'reference'];
    
    public function fonctionnaire()
    {
        return $this->belongsTo(Fonctionnaire::class);
    }
}
