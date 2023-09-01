<?php
require_once '../vendor/autoload.php';

$uid = $_POST['uid'];
$uname = $_POST['uname'];
$email = $_POST['email'];
$mobileNumber = $_POST['mobileNumber'];
$dob = $_POST['dob'];
$gender = $_POST['gender'];


$redis = new Predis\Client();
$redis_user_key = $redis->get($uid);


if ($redis_user_key) {

    $serverName = 'localhost';
    $userName = 'root';
    $mysql_password = '';
    $conn = new mysqli($serverName, $userName, $mysql_password, "guvi_intern");

    if ($conn) {
        $stmt = $conn->prepare("UPDATE userlogin SET email=? WHERE email=?");
        $stmt->bind_param('ss', $email, $redis_user_key);
        if ($stmt->execute()) {

            $client = new MongoDB\Client('mongodb://localhost:27017');

            $db = $client->guvi_intern;
            $collection = $db->users;
            $collection->updateOne(
                ['email' => $redis_user_key],
                [
                    '$set' => [
                        'name' => $uname,
                        'email' => $email,
                        'mobile' => $mobileNumber,
                        'dob' => $dob,
                        'gender' => $gender,
                    ]
                ]
            );

            $redis->set($uid, $email);
            echo json_encode(array('status' => true));
        } else {
            echo json_encode((array('status' => false)));
        }
    } else {
        die('not connected' . mysqli_connect_error());
    }
} else {
    echo json_encode(array('status' => false));
    exit();
}
