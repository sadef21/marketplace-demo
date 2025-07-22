<?php
require_once 'config.php';
$i_id = intval($_POST['itemId']);

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: $conn->connect_error");
} 
$sql = "DELETE FROM feedback WHERE itemId = $i_id";
$conn->query($sql);

$sql = "DELETE FROM items WHERE itemId = $i_id";
$stmt = $conn->prepare($sql);
$result = $stmt->execute();
if ($result === TRUE) {
    echo 1;
} else {
    echo "Error: $sql<br>$conn->error";
}
$conn->commit();
$conn->close();
?>