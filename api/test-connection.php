<?php
/**
 * POST JSON: same contract as Go /api/test-connection (PHP dev server / Apache).
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 524288) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'invalid body']);
    exit;
}

$req = json_decode($raw, true);
if (!is_array($req)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'invalid json']);
    exit;
}

$platform = $req['platform'] ?? '';
$result = null;

switch ($platform) {
    case 'aws':
        $result = testAws($req);
        break;
    case 'azure':
        $result = testAzure($req);
        break;
    case 'ibmcloud':
        $result = testIbm($req);
        break;
    case 'gcp':
        $result = testGcp($req);
        break;
    case 'powervs':
        $result = testPowervs($req);
        break;
    case 'baremetal':
        $result = testBareMetal($req);
        break;
    default:
        http_response_code(422);
        echo json_encode(['ok' => false, 'message' => 'unknown platform']);
        exit;
}

if ($result !== null && empty($result['ok'])) {
    http_response_code(422);
}
echo json_encode($result);

function testAws(array $req): array
{
    $key = trim((string)($req['accessKeyId'] ?? ''));
    $sec = (string)($req['secretAccessKey'] ?? '');
    if ($key === '' || $sec === '') {
        return ['ok' => false, 'message' => 'missing_access_key_or_secret'];
    }
    $region = trim((string)($req['region'] ?? 'eu-central-1'));
    if ($region === '') {
        $region = 'eu-central-1';
    }
    $token = trim((string)($req['sessionToken'] ?? ''));

    $aws = trim((string)shell_exec('command -v aws 2>/dev/null'));
    if ($aws === '') {
        return ['ok' => false, 'message' => 'aws_cli_missing'];
    }

    putenv('AWS_ACCESS_KEY_ID=' . $key);
    putenv('AWS_SECRET_ACCESS_KEY=' . $sec);
    putenv('AWS_DEFAULT_REGION=' . $region);
    if ($token !== '') {
        putenv('AWS_SESSION_TOKEN=' . $token);
    } else {
        putenv('AWS_SESSION_TOKEN');
    }
    $out = shell_exec(escapeshellcmd($aws) . ' sts get-caller-identity --output json 2>&1');
    putenv('AWS_ACCESS_KEY_ID');
    putenv('AWS_SECRET_ACCESS_KEY');
    putenv('AWS_DEFAULT_REGION');
    putenv('AWS_SESSION_TOKEN');

    if ($out === null || $out === '') {
        return ['ok' => false, 'message' => 'aws_cli_failed'];
    }
    $j = json_decode($out, true);
    if (is_array($j) && isset($j['Arn'])) {
        return ['ok' => true, 'message' => (string)$j['Arn']];
    }
    return ['ok' => false, 'message' => 'aws_sts: ' . substr(trim($out), 0, 400)];
}

function testAzure(array $req): array
{
    $tid = trim((string)($req['tenantId'] ?? ''));
    $cid = trim((string)($req['clientId'] ?? ''));
    $sec = (string)($req['clientSecret'] ?? '');
    if ($tid === '' || $cid === '' || $sec === '') {
        return ['ok' => false, 'message' => 'missing_azure_credentials'];
    }
    $url = 'https://login.microsoftonline.com/' . rawurlencode($tid) . '/oauth2/v2.0/token';
    $body = http_build_query([
        'client_id' => $cid,
        'client_secret' => $sec,
        'scope' => 'https://management.azure.com/.default',
        'grant_type' => 'client_credentials',
    ]);
    $ctx = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $body,
            'timeout' => 30,
        ],
    ]);
    $res = @file_get_contents($url, false, $ctx);
    if ($res === false) {
        return ['ok' => false, 'message' => 'azure_http_failed'];
    }
    $j = json_decode($res, true);
    if (is_array($j) && !empty($j['access_token'])) {
        return ['ok' => true, 'message' => 'azure_ok'];
    }
    return ['ok' => false, 'message' => 'azure_token: ' . substr($res, 0, 300)];
}

function testIbm(array $req): array
{
    $key = trim((string)($req['apiKey'] ?? ''));
    if ($key === '') {
        return ['ok' => false, 'message' => 'missing_ibm_api_key'];
    }
    $body = http_build_query([
        'grant_type' => 'urn:ibm:params:oauth:grant-type:apikey',
        'apikey' => $key,
    ]);
    $ctx = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\nAccept: application/json\r\n",
            'content' => $body,
            'timeout' => 30,
        ],
    ]);
    $res = @file_get_contents('https://iam.cloud.ibm.com/identity/token', false, $ctx);
    if ($res === false) {
        return ['ok' => false, 'message' => 'ibm_http_failed'];
    }
    $j = json_decode($res, true);
    if (is_array($j) && !empty($j['access_token'])) {
        return ['ok' => true, 'message' => 'ibm_ok'];
    }
    return ['ok' => false, 'message' => 'ibm_token: ' . substr($res, 0, 300)];
}

function testGcp(array $req): array
{
    $proj = trim((string)($req['gcpProjectId'] ?? ''));
    if ($proj === '') {
        return ['ok' => false, 'message' => 'missing_gcp_project'];
    }
    $raw = trim((string)($req['gcpServiceAccountJson'] ?? ''));
    if ($raw === '') {
        return ['ok' => false, 'message' => 'missing_gcp_sa'];
    }
    json_decode($raw);
    if (json_last_error() !== JSON_ERROR_NONE) {
        return ['ok' => false, 'message' => 'invalid_gcp_json'];
    }
    return ['ok' => true, 'message' => 'gcp_ok'];
}

function testPowervs(array $req): array
{
    $inst = trim((string)($req['serviceInstanceID'] ?? ''));
    if ($inst === '') {
        return ['ok' => false, 'message' => 'missing_powervs_instance'];
    }
    $r = testIbm($req);
    if (empty($r['ok'])) {
        return $r;
    }
    return ['ok' => true, 'message' => 'powervs_ok'];
}

function testBareMetal(array $req): array
{
    $user = trim((string)($req['bmcUser'] ?? ''));
    $pass = (string)($req['bmcPassword'] ?? '');
    if ($user === '' || $pass === '') {
        return ['ok' => false, 'message' => 'missing_bmc_credentials'];
    }
    $api = trim((string)($req['apiVIP'] ?? ''));
    $ing = trim((string)($req['ingressVIP'] ?? ''));
    if ($api !== '' && !isLikelyIpv4($api)) {
        return ['ok' => false, 'message' => 'invalid_api_vip'];
    }
    if ($ing !== '' && !isLikelyIpv4($ing)) {
        return ['ok' => false, 'message' => 'invalid_ingress_vip'];
    }
    return ['ok' => true, 'message' => 'baremetal_ok'];
}

function isLikelyIpv4(string $s): bool
{
    $parts = explode('.', $s);
    if (count($parts) !== 4) {
        return false;
    }
    foreach ($parts as $p) {
        if ($p === '' || strlen($p) > 3) {
            return false;
        }
        if (!ctype_digit($p)) {
            return false;
        }
        $n = (int)$p;
        if ($n > 255) {
            return false;
        }
    }
    return true;
}
