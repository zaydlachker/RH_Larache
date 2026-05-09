<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReclassementRecord extends Model
{
    protected $fillable = ['fonctionnaire_id', 'ancien_grade', 'nouveau_grade', 'date_effet', 'reference'];
    
    public function fonctionnaire()
    {
        return $this->belongsTo(Fonctionnaire::class);
    }
}
