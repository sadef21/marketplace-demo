<?php
require_once 'config.php';
$i_id = $_POST['itemId'] ?? null;

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: $conn->connect_error");
} 
$sql = "SELECT users.userName, feedback.feedbackText FROM `feedback`JOIN users ON users.userId = feedback.userId WHERE feedback.itemId = $i_id";
$result = $conn->query($sql);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data, JSON_UNESCAPED_UNICODE);

$conn->close();
?>