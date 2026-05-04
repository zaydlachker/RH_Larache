<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Candidature extends Model
{
    protected $fillable = [
        'candidat_id',
        'concours_id',
        'status',
        'submission_date',
        'notes',
    ];

    public function candidat(): BelongsTo
    {
        return $this->belongsTo(Candidat::class);
    }

    public function concours(): BelongsTo
    {
        return $this->belongsTo(Concours::class);
    }
}
