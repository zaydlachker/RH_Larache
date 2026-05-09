<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('titularisation_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fonctionnaire_id')->constrained('fonctionnaires')->onDelete('cascade');
            $table->string('grade')->nullable();
            $table->date('date_effet')->nullable();
            $table->string('reference')->nullable();
            $table->timestamps();
        });

        Schema::create('recrutement_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fonctionnaire_id')->constrained('fonctionnaires')->onDelete('cascade');
            $table->string('diplome')->nullable();
            $table->string('specialite')->nullable();
            $table->string('grade')->nullable();
            $table->date('date_recrutement')->nullable();
            $table->string('reference')->nullable();
            $table->timestamps();
        });

        Schema::create('reclassement_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fonctionnaire_id')->constrained('fonctionnaires')->onDelete('cascade');
            $table->string('ancien_grade')->nullable();
            $table->string('nouveau_grade')->nullable();
            $table->date('date_effet')->nullable();
            $table->string('reference')->nullable();
            $table->timestamps();
        });

        Schema::create('avancement_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fonctionnaire_id')->constrained('fonctionnaires')->onDelete('cascade');
            $table->string('ancien_echelon')->nullable();
            $table->string('nouvel_echelon')->nullable();
            $table->string('nouveau_grade')->nullable();
            $table->date('date_effet')->nullable();
            $table->text('avis_superieur')->nullable();
            $table->text('avis_chef')->nullable();
            $table->text('avis_admin')->nullable();
            $table->string('reference')->nullable();
            $table->timestamps();
        });

        // Add record tracking to acte_administratifs
        Schema::table('acte_administratifs', function (Blueprint $table) {
            $table->string('title')->nullable()->after('type');
            $table->string('record_type')->nullable()->after('data');
            $table->unsignedBigInteger('record_id')->nullable()->after('record_type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('avancement_records');
        Schema::dropIfExists('reclassement_records');
        Schema::dropIfExists('recrutement_records');
        Schema::dropIfExists('titularisation_records');
        
        Schema::table('acte_administratifs', function (Blueprint $table) {
            $table->dropColumn(['record_type', 'record_id']);
        });
    }
};
