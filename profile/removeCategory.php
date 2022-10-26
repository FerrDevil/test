<?php

    session_start();
    header('Content-Type: application/json');
    if(isset($_SESSION['user'])){
        $resp = (array) json_decode(file_get_contents('php://input'));
		$resp = $resp['id'];
        $db = mysqli_connect('localhost', 'root', 'root', 'cityportal');
        mysqli_query($db, "DELETE FROM `categories` WHERE `categories`.`categoryId` = '$resp';");
        mysqli_query($db, "DELETE FROM `proposals` WHERE `proposals`.`categoryId` = '$resp';");
		echo json_encode(['response'=> 200]);
	}
	else{
		echo json_encode(['response'=> 404]);
	}
	
?>