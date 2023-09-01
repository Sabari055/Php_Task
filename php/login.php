<?php

require_once '../vendor/autoload.php';

$email = $_POST['email'];
$password = $_POST['password'];

$serverName = 'localhost';
$userName = 'root';
$mysql_password = '';

$conn = new mysqli($serverName, $userName, $mysql_password, "guvi_intern");
if ($conn) {
    $sql = "select * from userlogin where email = '$email'";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $count = mysqli_num_rows($result);
    if ($count > 0) {
        if (password_verify($password, $row['password'])) {
   
            $redis = new Predis\Client();
            $redisKey = substr($email, 0, 2) . (rand() / 2 * -1) . substr($password, 2, 4) . (rand() / 200 * -1);
            $isValidKey = $redis->set($redisKey, $email);
            $redis->expire($redisKey, 1800);
            echo json_encode(array('status' => true, 'uid' => $redisKey));
            exit();
        } else
            echo json_encode(array('status' => false, 'msg' => 'invalid password'));
        exit();
    } else {
        echo json_encode(array('status' => false, 'msg' => 'invalid credentials'));
        exit();
    }
} else {
    die('not connected' . mysqli_connect_error());
}
