<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include 'config.php';

try {
    $stmt = $conn->prepare("SELECT * FROM menu_items ORDER BY category, name");
    $stmt->execute();
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($items);
} catch (PDOException $e) {
    echo json_encode(["error" => "Failed to fetch menu items: " . $e->getMessage()]);
}
?>
