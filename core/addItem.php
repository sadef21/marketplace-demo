<?php
require_once 'config.php';
$i_vendor = intval($_POST['itemVendor']);
$i_category = intval($_POST['itemCategory']);
$i_name = trim($_POST['itemName']);
$i_desc = trim($_POST['itemDesc']);
$i_img = $_POST['itemImg'];
$i_price = doubleval($_POST['itemPrice']);
$i_params = trim($_POST['itemParams']);

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: $conn->connect_error");
} 

$sql = "INSERT INTO items(vendorId, itemCategory, itemName, itemDesc, itemImg, itemPrice, itemParams) VALUES (?,?,?,?,?,?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iissbds", $i_vendor, $i_category, $i_name, $i_desc, $null, $i_price, $i_params);

$i_img = str_replace(' ', '+', $i_img);
$i_img = base64_decode($i_img);
$stmt->send_long_data(4, $i_img);
$result = $stmt->execute();
if ($result === TRUE) {
    echo 1;
} else {
    echo "Error: $sql<br>$conn->error";
}
$conn->commit();
$conn->close();
?>