<?php
require_once '../vendor/autoload.php';

$uid = $_POST['uid'];

$redis = new Predis\Client();
$user = $redis->get($uid);

if ($user) {
    echo json_encode(array('status' => true));
    exit();
} else {
    echo json_encode(array('status' => false));
    exit();
}
