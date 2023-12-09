<?php

require_once "./config.php";

$conn = $mysql_db;
$conn_mongo = $mongo_db;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];
    $full_name = $_POST["full_name"];

    // Checking if Email already in use
    try {   
        $stmt = $conn->prepare("Select email from users where email = ?");
        $stmt->execute([$email]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(array("error"=> $e->getMessage()));
        return;
    }

    $res = $stmt->fetchAll();
        
    if (count($res) != 0) {
        http_response_code(400);
        echo json_encode(array("message"=> "Email already in use. Please use different email OR login"));
        return;
    } else {

        // Adding user if the email is not already used
        try {
            $stmt = $conn->prepare("insert into users values(?, ?, ?)");
            $stmt->execute([$email, password_hash($password, PASSWORD_DEFAULT) , $full_name]);
            
            $insertProfileData = $conn_mongo->insertOne(
                [
                    'email' => $email,
                    'full_name' => $full_name
                ]
            );

            http_response_code(200);
            echo json_encode(array("message" => "User added successfully. You can now Login."));
            return;
        }catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array("error" => $e->getMessage()));
            return;
        }

    }
}