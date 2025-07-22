<?php
    require_once 'config.php';
    $email = $_POST['email'];
    $name = $_POST['name'];
    $pass = $_POST['pass'];
    $permission = $_POST['permission'];

    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: $conn->connect_error");
    } 
    $sql = "SELECT * FROM users WHERE userEmail='$email'";
    if($conn->query($sql)->num_rows > 0)
    {
        echo 2;
        die; 
    }
    $sql = "SELECT * FROM users WHERE userName='$name'";
    if($conn->query($sql)->num_rows > 0)
    {
        echo 3;
        die; 
    }

    $sql = "INSERT INTO users (userEmail, userName, userPassword, userPermission) 
    VALUES ('$email', '$name', '$pass', '$permission')";

    if ($conn->query($sql) === TRUE) {
        echo 1;
    } else {
        echo "Error:$sql<br>$conn->error";
    }

    $conn->close();
?>