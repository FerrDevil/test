<?php
    header('Content-Type: application/json');
    session_start();
    $user_id = $_SESSION['user']['id'];
    
    $db = mysqli_connect('localhost', 'root', 'root', 'cityportal');
    $query = mysqli_query($db, "SELECT *  FROM `proposals` INNER JOIN `categories` ON `proposals`.`categoryId` = `categories`.`categoryId`  WHERE `userId` = '$user_id'");
    $ouput = [];
    while($row = mysqli_fetch_assoc($query)){
        $ouput[] = $row;
    }
    
    echo json_encode($ouput);
?>