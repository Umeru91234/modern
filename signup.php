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

// Validation
if (!$data['username'] || !$data['password'] || !$data['email']) {
    echo json_encode(["error" => "All fields are required"]);
    exit();
}

if (strlen($data['password']) < 6) {
    echo json_encode(["error" => "Password must be at least 6 characters long"]);
    exit();
}

if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["error" => "Invalid email format"]);
    exit();
}

try {
    // Check if username already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$data['username']]);
    if ($stmt->fetch()) {
        echo json_encode(["error" => "Username already exists"]);
        exit();
    }

    // Check if email already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$data['email']]);
    if ($stmt->fetch()) {
        echo json_encode(["error" => "Email already exists"]);
        exit();
    }

    // Hash password
    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

    // Insert new user
    $stmt = $conn->prepare("INSERT INTO users (username, password, email, role, created_at) VALUES (?, ?, ?, 'staff', NOW())");
    $stmt->execute([
        $data['username'],
        $hashedPassword,
        $data['email']
    ]);
    
    echo json_encode([
        "success" => true, 
        "message" => "Account created successfully! You can now sign in.",
        "user" => [
            "id" => $conn->lastInsertId(),
            "username" => $data['username'],
            "email" => $data['email'],
            "role" => "staff"
        ]
    ]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Failed to create account: " . $e->getMessage()]);
}
?>
