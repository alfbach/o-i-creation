<?php

declare(strict_types=1);

/**
 * Standalone OpenShift install-config generator — URL helpers for assets.
 * Works in document root or in a subdirectory (e.g. /myapp/index.php).
 */

function oic_base_path(): string
{
    $script = $_SERVER['SCRIPT_NAME'] ?? '/index.php';
    $dir = str_replace('\\', '/', dirname($script));
    if ($dir === '/' || $dir === '.') {
        return '';
    }

    return rtrim($dir, '/');
}

function oic_url(string $relativePath): string
{
    $relativePath = ltrim(str_replace('\\', '/', $relativePath), '/');
    if ($relativePath === '' || strpos($relativePath, '..') !== false) {
        throw new InvalidArgumentException('Invalid asset path');
    }

    $base = oic_base_path();
    $prefix = $base === '' ? '' : $base;

    return htmlspecialchars($prefix . '/' . $relativePath, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}
