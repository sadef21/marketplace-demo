<?php
require_once 'config.php';
$i_id = intval($_POST['itemId']);
$i_category = intval($_POST['itemCategory']);
$i_name= trim($_POST['itemName']);
$i_desc = trim($_POST['itemDesc']);
$i_img = $_POST['itemImg'];
$i_price = doubleval($_POST['itemPrice']);
$i_params = trim($_POST['itemParams']);

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: $conn->connect_error");
} 

$sql = "UPDATE items SET itemCategory = ?, itemName = ?, itemDesc = ?, itemImg = ?, itemPrice = ?, itemParams = ? WHERE itemId = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("issbdsi", $i_category, $i_name, $i_desc, $null, $i_price, $i_params, $i_id);

$i_img = str_replace(' ', '+', $i_img);
$i_img = base64_decode($i_img);
$stmt->send_long_data(3, $i_img);
$result = $stmt->execute();
if ($result === TRUE) {
    echo 1;
} else {
    echo "Error: $sql<br>$conn->error";
}
$conn->commit();
$conn->close();
?>