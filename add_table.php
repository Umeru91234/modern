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

if (!$data['number'] || !$data['capacity']) {
    echo json_encode(["error" => "Table number and capacity are required"]);
    exit();
}

try {
    $stmt = $conn->prepare("INSERT INTO tables (number, capacity, status) VALUES (?, ?, ?)");
    $stmt->execute([
        $data['number'],
        $data['capacity'],
        $data['status'] ?? 'Available'
    ]);
    
    echo json_encode(["success" => true, "id" => $conn->lastInsertId()]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Failed to add table: " . $e->getMessage()]);
}
?>
