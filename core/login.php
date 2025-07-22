<?php
require_once 'config.php';

$email= trim($_POST['email']);
$pass = trim($_POST['pass']);

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: $conn->connect_error");
} 

$sql = "SELECT * FROM users WHERE userEmail='$email'";
$result1 = $conn->query($sql);
if ($result1->num_rows == 0){
    echo 1;
    die;
}
$sql = "SELECT userId, userName, userPermission FROM users WHERE userEmail='$email' and userPassword ='$pass'";
$result2 = $conn->query($sql);
if ($result2->num_rows > 0) {
    // output data of each row
    $row = $result2->fetch_assoc();
    echo json_encode($row);
} else {
    echo 2;
}

$conn->close();
?>