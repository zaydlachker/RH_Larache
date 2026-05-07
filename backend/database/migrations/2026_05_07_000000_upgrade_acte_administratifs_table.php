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
        Schema::table('acte_administratifs', function (Blueprint $table) {
            // Change candidat_id to nullable
            $table->foreignId('candidat_id')->nullable()->change();
            
            // Add fonctionnaire_id
            $table->foreignId('fonctionnaire_id')->nullable()->after('candidat_id')->constrained('fonctionnaires')->onDelete('cascade');
            
            // Change type to include all arrete types
            $table->string('type')->change(); // Using string for flexibility
            
            // Add data JSON column
            $table->json('data')->nullable()->after('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('acte_administratifs', function (Blueprint $table) {
            $table->dropForeign(['fonctionnaire_id']);
            $table->dropColumn(['fonctionnaire_id', 'data']);
        });
    }
};
