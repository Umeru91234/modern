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
    $stmt = $conn->prepare("
        SELECT o.*, t.number as table_number, m.name as item, m.price 
        FROM orders o 
        JOIN tables t ON o.table_id = t.id 
        JOIN menu_items m ON o.item_id = m.id 
        ORDER BY o.order_time DESC
    ");
    $stmt->execute();
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($orders);
} catch (PDOException $e) {
    echo json_encode(["error" => "Failed to fetch orders: " . $e->getMessage()]);
}
?>
