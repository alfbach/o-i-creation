<?php
/**
 * Build step: emit static/index.html from views/main.php (replace oic_url() with plain paths).
 */
declare(strict_types=1);

$root = dirname(__DIR__);
$srcPath = $root . '/views/main.php';
$outDir = $root . '/static';
$outFile = $outDir . '/index.html';

if (!is_readable($srcPath)) {
    fwrite(STDERR, "Missing: $srcPath\n");
    exit(1);
}

$html = file_get_contents($srcPath);
if ($html === false) {
    fwrite(STDERR, "Cannot read: $srcPath\n");
    exit(1);
}

// Replace oic_url(...) tags in main.php; double-quoted regex avoids quote issues.
$html = preg_replace("/<\?=\s*oic_url\(\s*'([^']+)'\s*\)\s*\?>/", '$1', $html);
if ($html === null) {
    fwrite(STDERR, "preg_replace failed\n");
    exit(1);
}

if (strpos($html, '<?') !== false) {
    fwrite(STDERR, "Warning: remaining PHP tags in static output — review views/main.php\n");
}

if (!is_dir($outDir) && !mkdir($outDir, 0755, true)) {
    fwrite(STDERR, "Cannot create: $outDir\n");
    exit(1);
}

if (file_put_contents($outFile, $html) === false) {
    fwrite(STDERR, "Cannot write: $outFile\n");
    exit(1);
}

echo "Wrote $outFile\n";
