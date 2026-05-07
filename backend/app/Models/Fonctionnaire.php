<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Fonctionnaire extends Model
{
    protected $fillable = [
        'user_id',
        'matricule',
        'statut',
        'grade',
        'echelle',
        'echelon',
        'anciennete',
        'cin',
        'phone',
        'date_naissance',
        'lieu_naissance',
        'nationalite',
        'diplome',
        'department',
        'position',
        'hire_date',
        'salary',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function notations(): HasMany
    {
        return $this->hasMany(Notation::class);
    }
}
