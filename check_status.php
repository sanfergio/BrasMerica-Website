<?php


$token = $_GET['token'] ?? '';
$tokenTransaction = $_GET['tokenTransaction'] ?? '';

if (!$token || !$tokenTransaction) {
    echo json_encode(['error' => 'Parâmetros inválidos']);
    exit;
}

$curl2 = curl_init();
curl_setopt_array($curl2, [
    CURLOPT_URL => "https://api.intermediador.yapay.com.br/api/v3/transactions/get_by_token?token_account=$token&token_transaction=$tokenTransaction",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_TIMEOUT => 10,
    CURLOPT_CONNECTTIMEOUT => 10,
]);

$response2 = curl_exec($curl2);
$httpcode2 = curl_getinfo($curl2, CURLINFO_HTTP_CODE);
curl_close($curl2);

if ($httpcode2 == 200) {
    $data = json_decode($response2, true);
    $status_id = $data['data_response']['transaction']['status_id'] ?? null;
    echo json_encode(['status_id' => $status_id]);
} else {
    echo json_encode(['error' => "Erro na requisição: HTTP $httpcode2"]);
}
