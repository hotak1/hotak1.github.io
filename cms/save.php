<?php
header('Content-Type: application/json');

$inputData = file_get_contents('php://input');

if (!$inputData) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "No data provided."]);
    exit;
}

$filePath = '../content.json';
if (file_put_contents($filePath, $inputData)) {
    echo json_encode(["status" => "success", "message" => "content.json updated successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Unable to write to file."]);
}
?>