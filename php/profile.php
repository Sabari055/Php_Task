<?php
require_once '../vendor/autoload.php';

$uid = $_GET['uid'];


 
$redis = new Predis\Client();
$user = $redis->get($uid);

if ($user) {

    $client = new MongoDB\Client('mongodb://localhost:27017');

    $db = $client->guvi_intern;
    $collection = $db->users;
    $fetchedDoc = $collection->findOne(
        ['email' => $user]
    );
    if ($fetchedDoc) {
        echo json_encode(array(
            'status' => true,
            'name' => $fetchedDoc['name'],
            'email' => $fetchedDoc['email'],
            'mobile' => $fetchedDoc['mobile'],
            'dob' => $fetchedDoc['dob'],
            'gender' => $fetchedDoc['gender']
        ));
    } else {
        echo json_encode(array('staus' => false));
        exit();
    }
} else {
    echo json_encode(array('status' => false));
    exit();
}
