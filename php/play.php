<?php

require_once '../vendor/autoload.php';

$redis = new Predis\Client();


$isValidKey = $redis->get('uid');
if ($isValidKey) {
    $redis->set('uid', 'tamannaah bhaita');
    echo $isValidKey;
} else {
    $redis->set('uid', 'shriya saren');
}
