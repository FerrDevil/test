<?php
	session_start();

	header('Content-Type: application/json');
	if(isset($_SESSION['user'])){
        $resp = (array) json_decode(file_get_contents('php://input'));
		$resp = $resp['id'];
        $db = mysqli_connect('localhost', 'root', 'root', 'cityportal');
        mysqli_query($db, "UPDATE `proposals` SET `status` = 'rejected' WHERE `proposals`.`id` = '$resp';");
		echo json_encode(['response'=> 200]);
	}
	else{
		echo json_encode(['response'=> 404]);
	}
	
?>