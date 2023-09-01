<?php

require_once '../vendor/autoload.php';

$uname = $_POST['uname'];
$password = $_POST['password'];
$email = $_POST['email'];
$mobileNumber = $_POST['mobileNumber'];
$dob = $_POST['dob'];
$gender = $_POST['gender'];

$serverName = 'localhost';
$userName = 'root';
$mysql_password = '';
$conn = new mysqli($serverName, $userName, $mysql_password, "guvi_intern");

if ($conn) {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO userlogin(email,password) values(?,?)");
    $db_email = $email;
    $stmt->bind_param('ss', $db_email, $hashedPassword);
    if ($stmt->execute()) {
 
        $client = new MongoDB\Client('mongodb://localhost:27017');

        $db = $client->guvi_intern;
        $collection = $db->users;
        $collection->insertOne(
            [
                'name' => $uname,
                'email' => $email,
                'mobile' => $mobileNumber,
                'dob' => $dob,
                'gender' => $gender,
            ]
        );

        echo json_encode((array('status' => true)));
    } else {
        echo json_encode((array('status' => false)));
    }
} else {
    die('not connected' . mysqli_connect_error());
}
