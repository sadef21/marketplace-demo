<?php
require_once 'config.php';
$i_id = $_POST['itemId'] ?? null;
$u_id = intval($_POST['userId']);
$f_text = $_POST['feedbackText'];

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: $conn->connect_error");
} 

$sql = "INSERT INTO feedback(itemId, userId, feedbackText) VALUES ('$i_id','$u_id','$f_text')";
$result = $conn->query($sql);
if ($result === TRUE) {
    echo 1;
} else {
    echo "Error: $sql<br>$conn->error";
}
$conn->commit();
$conn->close();
?>