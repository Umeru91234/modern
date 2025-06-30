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

if (!$data['name'] || !$data['price'] || !$data['category']) {
    echo json_encode(["error" => "Name, price, and category are required"]);
    exit();
}

try {
    $stmt = $conn->prepare("INSERT INTO menu_items (name, description, price, category, image) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([
        $data['name'],
        $data['description'] ?? '',
        $data['price'],
        $data['category'],
        $data['image'] ?? 'https://placehold.co/300x200'
    ]);
    
    echo json_encode(["success" => true, "id" => $conn->lastInsertId()]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Failed to add menu item: " . $e->getMessage()]);
}
?>
