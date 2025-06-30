<?php
$host = 'localhost';
$db   = 'restaurant_db';  // apna DB ka naam yahan do
$user = 'root';           // default XAMPP user
$pass = '';               // default XAMPP password (blank)

try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit();
}
?>
