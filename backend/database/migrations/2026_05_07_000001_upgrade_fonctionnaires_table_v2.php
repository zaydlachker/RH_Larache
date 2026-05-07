<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('fonctionnaires', function (Blueprint $table) {
            $table->string('statut')->nullable()->after('matricule');
            $table->string('grade')->nullable()->after('statut');
            $table->string('echelle')->nullable()->after('grade');
            $table->string('echelon')->nullable()->after('echelle');
            $table->string('anciennete')->nullable()->after('echelon');
            $table->string('cin')->nullable()->after('anciennete');
            $table->string('phone')->nullable()->after('cin');
            $table->date('date_naissance')->nullable()->after('phone');
            $table->string('lieu_naissance')->nullable()->after('date_naissance');
            $table->string('nationalite')->nullable()->after('lieu_naissance');
            $table->string('diplome')->nullable()->after('nationalite');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('fonctionnaires', function (Blueprint $table) {
            $table->dropColumn([
                'statut', 'grade', 'echelle', 'echelon', 'anciennete',
                'cin', 'phone', 'date_naissance', 'lieu_naissance',
                'nationalite', 'diplome'
            ]);
        });
    }
};
