<?php

require_once "./config.php";

$conn = $mysql_db;


// $email = "admin@me.co";
// $password = "123456";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];
    
    try{
        $stmt = $conn->prepare("Select email, password from users where email = ?");
        $stmt->execute([$email]);
        $res = $stmt->fetchAll();
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(array("error"=> $e->getMessage()));
        return;
    }
    

    if (count($res) != 1) {
        http_response_code(200);
        echo json_encode(array("message" => "Your Credintials are not correct", "success" => false));
        return;
    }

    if ($res[0]["email"] == $email &&  password_verify($password, $res[0]["password"])) {
        http_response_code(200);
        echo json_encode(array("message" => "Your Credintials are correct, Logged IN", "success" => true));
        return;
    }

    echo json_encode(array("message" => "Your Credintials are not correct", "success" => false));
    return;

}
