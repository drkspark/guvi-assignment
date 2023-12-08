<?php

require_once "./env.php";

$uri = MYSQL_URI;

$fields = parse_url($uri);

$conn = "mysql:";
$conn .= "host=" . $fields["host"];
$conn .= ";port=" . $fields["port"];;
$conn .= ";dbname=defaultdb";
$conn .= ";sslmode=verify-ca;sslrootcert=" . MYSQL_SSL_CERT_PATH;

try {
  $mysql_db = new PDO($conn, $fields["user"], $fields["pass"]);
} catch (Exception $e) {
  echo "Error: " . $e->getMessage();
}