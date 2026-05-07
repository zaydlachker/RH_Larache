<?php

require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "Starting migration fix...\n";

try {
    if (Schema::hasTable('fonctionnaires')) {
        Schema::table('fonctionnaires', function (Blueprint $table) {
            if (!Schema::hasColumn('fonctionnaires', 'statut')) {
                $table->string('statut')->nullable();
                echo "Added 'statut' column.\n";
            }
            if (!Schema::hasColumn('fonctionnaires', 'grade')) {
                $table->string('grade')->nullable();
                echo "Added 'grade' column.\n";
            }
            if (!Schema::hasColumn('fonctionnaires', 'echelle')) {
                $table->string('echelle')->nullable();
                echo "Added 'echelle' column.\n";
            }
            if (!Schema::hasColumn('fonctionnaires', 'echelon')) {
                $table->string('echelon')->nullable();
                echo "Added 'echelon' column.\n";
            }
            if (!Schema::hasColumn('fonctionnaires', 'anciennete')) {
                $table->string('anciennete')->nullable();
                echo "Added 'anciennete' column.\n";
            }
            if (!Schema::hasColumn('fonctionnaires', 'cin')) {
                $table->string('cin')->nullable();
                echo "Added 'cin' column.\n";
            }
            if (!Schema::hasColumn('fonctionnaires', 'phone')) {
                $table->string('phone')->nullable();
                echo "Added 'phone' column.\n";
            }
            if (!Schema::hasColumn('fonctionnaires', 'date_naissance')) {
                $table->date('date_naissance')->nullable();
                echo "Added 'date_naissance' column.\n";
            }
            if (!Schema::hasColumn('fonctionnaires', 'lieu_naissance')) {
                $table->string('lieu_naissance')->nullable();
                echo "Added 'lieu_naissance' column.\n";
            }
            if (!Schema::hasColumn('fonctionnaires', 'nationalite')) {
                $table->string('nationalite')->nullable();
                echo "Added 'nationalite' column.\n";
            }
            if (!Schema::hasColumn('fonctionnaires', 'diplome')) {
                $table->string('diplome')->nullable();
                echo "Added 'diplome' column.\n";
            }
        });
        echo "Migration fix completed successfully.\n";
    } else {
        echo "Table 'fonctionnaires' not found.\n";
    }
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
