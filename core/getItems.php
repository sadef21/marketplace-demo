<?php
require_once 'config.php';
$i_category = $_POST['itemCategory'] ?? null;
$i_id = $_POST['itemId'] ?? null;

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: $conn->connect_error");
} 
$sql = "SELECT * FROM items";
if($i_category != null)
{
    $sql .= " WHERE itemCategory = $i_category";
}
elseif($i_id != null)
{
    $sql .= " WHERE itemId = $i_id";
}
$result = $conn->query($sql);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $row['itemImg'] = base64_encode($row['itemImg']);  // BLOB To Base64
    $data[] = $row;
}

echo json_encode($data, JSON_UNESCAPED_UNICODE);

$conn->close();
?>