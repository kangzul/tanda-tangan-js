<?php

$now = date('YmdHis');
$uri_image = $_POST['uri_image'];

$dir = "upload";
if (!is_dir($dir)) {
    mkdir($dir, 0777, true);
}
$encoded_image = explode(",", $uri_image)[1];
$decoded_image = base64_decode($encoded_image);
$nama_file = "Tanda-Tangan-JS-" . $now . ".png";
file_put_contents($dir . "/" . $nama_file, $decoded_image);

header('Content-Type: application/json');
echo json_encode(['status' => true]);
