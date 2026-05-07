<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Self-healing database: Ensure required columns exist globally
        try {
            if (\Illuminate\Support\Facades\Schema::hasTable('fonctionnaires') && !\Illuminate\Support\Facades\Schema::hasColumn('fonctionnaires', 'statut')) {
                \Illuminate\Support\Facades\Schema::table('fonctionnaires', function (\Illuminate\Database\Schema\Blueprint $table) {
                    $cols = ['statut', 'grade', 'echelle', 'echelon', 'anciennete', 'cin', 'phone', 'lieu_naissance', 'nationalite', 'diplome'];
                    foreach ($cols as $col) {
                        if (!\Illuminate\Support\Facades\Schema::hasColumn('fonctionnaires', $col)) {
                            $table->string($col)->nullable();
                        }
                    }
                    if (!\Illuminate\Support\Facades\Schema::hasColumn('fonctionnaires', 'date_naissance')) {
                        $table->date('date_naissance')->nullable();
                    }
                });
            }
        } catch (\Exception $e) {
            // Ignore errors during boot to prevent app crash if DB is not ready
        }
    }
}
