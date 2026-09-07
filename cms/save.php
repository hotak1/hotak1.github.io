<?php
header('Content-Type: application/json');

// Get raw JSON POST data
$inputData = file_get_contents('php_input');

if (!$inputData) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "No data provided."]);
    exit;
}

// Write to content.json in root folder
$filePath = '../content.json';
if (file_put_contents($filePath, $inputData)) {
    echo json_encode(["status" => "success", "message" => "Saved successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to write to content.json."]);
}
?>