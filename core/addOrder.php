<?php
require_once 'config.php';
$u_id = intval($_POST['userId']);
$o_content = $_POST['orderContent'];
$o_date = trim($_POST['orderDate']);

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: $conn->connect_error");
} 

$sql = "INSERT INTO orders(userId, orderContent, orderDate) VALUES ('$u_id','$o_content','$o_date')";
$result = $conn->query($sql);
if ($result === TRUE) {
    echo 1;
} else {
    echo "Error: $sql<br>$conn->error";
}
$conn->commit();
$conn->close();
?>