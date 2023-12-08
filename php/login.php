<?php

require "./config.php";

$mysql_client = $mysql_db;

$stmt = $db->query("SELECT VERSION()");
print($stmt->fetch()[0]);

