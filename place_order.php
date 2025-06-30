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

if (!$data['table_id'] || !$data['item_id'] || !$data['quantity']) {
    echo json_encode(["error" => "Table ID, item ID, and quantity are required"]);
    exit();
}

try {
    $stmt = $conn->prepare("INSERT INTO orders (table_id, item_id, quantity, status) VALUES (?, ?, ?, 'Pending')");
    $stmt->execute([
        $data['table_id'],
        $data['item_id'],
        $data['quantity']
    ]);
    
    echo json_encode(["success" => true, "id" => $conn->lastInsertId()]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Failed to place order: " . $e->getMessage()]);
}
?>
