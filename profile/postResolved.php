<?php
	$id = $_POST['proposal-id'];
	$second_image = $_FILES['file-input'];
	
	define ('SITE_ROOT', realpath(dirname('../src/uploads/')));
	$tmp_name = $second_image['tmp_name'];
	$file_name = basename( $second_image['name']);
	$image = str_replace('\\', '/', SITE_ROOT . "/uploads/$file_name");

	move_uploaded_file($tmp_name, $image);

	$image = str_replace('C:/OpenServer/domains','/' , $image);

	$db = mysqli_connect('localhost', 'root', 'root', 'cityportal');
	mysqli_query($db, "UPDATE `proposals` SET `status` = 'resolved' WHERE `proposals`.`id` = '$id';");
	mysqli_query($db, "UPDATE `proposals` SET `secondImage` = '$image' WHERE `proposals`.`id` = '$id';");
	
	
 	header('Location: ./');
?>