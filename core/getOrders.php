<?php
require_once 'config.php';
$u_id = $_POST['userId'];

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: $conn->connect_error");
} 
$sql = "SELECT * FROM orders WHERE userId = '$u_id'";
$result = $conn->query($sql);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data, JSON_UNESCAPED_UNICODE);

$conn->close();
?>