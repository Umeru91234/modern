<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include 'config.php';

$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(["error" => "ID is required"]);
    exit();
}

try {
    $stmt = $conn->prepare("DELETE FROM menu_items WHERE id = ?");
    $stmt->execute([$id]);
    
    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Failed to delete menu item: " . $e->getMessage()]);
}
?>
