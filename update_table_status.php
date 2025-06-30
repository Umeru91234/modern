<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data['id'] || !$data['status']) {
    echo json_encode(["error" => "ID and status are required"]);
    exit();
}

try {
    $stmt = $conn->prepare("UPDATE tables SET status = ? WHERE id = ?");
    $stmt->execute([$data['status'], $data['id']]);
    
    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Failed to update table status: " . $e->getMessage()]);
}
?>
