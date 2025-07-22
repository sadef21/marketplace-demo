<?php
require_once 'config.php';
$u_id = $_POST['userId'];

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: $conn->connect_error");
} 
$sql = $conn->query("SELECT * FROM users WHERE userId = $u_id");
$result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
echo json_encode($result, JSON_UNESCAPED_UNICODE);

$conn->close();
?>