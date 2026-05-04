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
        Schema::create('candidatures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidat_id')->constrained('candidats')->onDelete('cascade');
            $table->foreignId('concours_id')->constrained('concours')->onDelete('cascade');
            $table->enum('status', ['pending', 'accepted', 'rejected', 'waitlisted'])->default('pending');
            $table->dateTime('submission_date');
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->unique(['candidat_id', 'concours_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidatures');
    }
};
