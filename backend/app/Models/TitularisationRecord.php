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
