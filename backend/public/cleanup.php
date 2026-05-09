<?php
$filePath = __DIR__.'/../app/Models/ArreteRecords.php';
if (file_exists($filePath)) {
    if (unlink($filePath)) {
        echo "Deleted ArreteRecords.php successfully.";
    } else {
        echo "Failed to delete ArreteRecords.php.";
    }
} else {
    echo "ArreteRecords.php does not exist.";
}
