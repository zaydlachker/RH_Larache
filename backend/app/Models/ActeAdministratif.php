<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ActeAdministratif extends Model
{
    protected $fillable = [
        'candidat_id',
        'fonctionnaire_id',
        'type',
        'title',
        'data',
        'reference',
        'file_path',
        'issue_date',
        'generated_by',
        'description',
        'record_type',
        'record_id',
    ];

    protected $casts = [
        'data' => 'array',
        'issue_date' => 'datetime',
    ];

    public function candidat(): BelongsTo
    {
        return $this->belongsTo(Candidat::class);
    }

    public function fonctionnaire(): BelongsTo
    {
        return $this->belongsTo(Fonctionnaire::class);
    }

    public function record()
    {
        return $this->morphTo();
    }

    public function generator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'generated_by');
    }
}
