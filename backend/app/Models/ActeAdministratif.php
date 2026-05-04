<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ActeAdministratif extends Model
{
    protected $fillable = [
        'candidat_id',
        'type',
        'reference',
        'file_path',
        'issue_date',
        'generated_by',
        'description',
    ];

    public function candidat(): BelongsTo
    {
        return $this->belongsTo(Candidat::class);
    }

    public function generator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'generated_by');
    }
}
