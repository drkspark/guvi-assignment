<?php

require_once "./config.php";

$conn = $mongo_db;


if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $email = $_GET["email"];

    try {
        $res = $conn->findOne(['email' => $email]);
        http_response_code(200);
        echo json_encode(array("message" => "Profile details retrieved successfully", "success" => true, "data" => $res));
        return;
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(array("message" => "Unable to retrieve Profile details", "error"=> $e->getMessage(), "success" => false));
        return;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    $inputData = file_get_contents("php://input");
    $data = json_decode($inputData, true);
    // echo json_encode(array("message" => "Profile update successful.", "success" => true, "data" => $data));
    // return;
    // $data = $inputData;
    if ($data !== null) {
        $filter = ["email" => $data["email"]];

        $updates = $data['updates'];

        // Build the update document
        $update = [];
        foreach ($updates as $key => $value) {
            $update["$key"] = $value;
        }

        try {
            // Update the document based on the email field
            $result = $conn->updateOne($filter, ['$set' => $update]);

            http_response_code(200);
            echo json_encode(array("message" => "Profile update successful.", "success" => true));
            return;
        } catch(Exception $e) {
            http_response_code(500);
            echo json_encode(array("message" => "Failed to update data.","error"=> $e->getMessage(), "success" => false));
            return;
        }
        
        return;
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "Unable to decode json data","message" => "Failed to update data.", "success" => false));
        return;
    }
}
