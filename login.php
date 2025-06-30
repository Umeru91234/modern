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

if (!$data['username'] || !$data['password']) {
    echo json_encode(["error" => "Username and password are required"]);
    exit();
}

try {
    $stmt = $conn->prepare("SELECT id, username, password, email, role FROM users WHERE username = ?");
    $stmt->execute([$data['username']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && password_verify($data['password'], $user['password'])) {
        // Generate a simple token (in production, use JWT or similar)
        $token = base64_encode($user['id'] . ':' . time() . ':' . $user['username']);
        
        echo json_encode([
            "success" => true,
            "token" => $token,
            "user" => [
                "id" => $user['id'],
                "username" => $user['username'],
                "email" => $user['email'],
                "role" => $user['role']
            ]
        ]);
    } else {
        echo json_encode(["error" => "Invalid username or password"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Login failed: " . $e->getMessage()]);
}
?>
