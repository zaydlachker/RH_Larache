<?php
$files = ['check_db.php', 'fix_migrations.php', 'cleanup.php', 'view_logs.php'];
foreach ($files as $f) {
    $path = __DIR__.'/'.$f;
    if (file_exists($path)) {
        unlink($path);
        echo "Deleted $f\n";
    }
}
