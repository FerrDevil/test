<?php
    $db = mysqli_connect('localhost', 'root', 'root', 'cityportal');
    $query = mysqli_query($db, "SELECT * FROM `proposals` INNER JOIN `categories` ON `proposals`.`categoryId` = `categories`.`categoryId`  WHERE `status` = 'resolved'");
    $ouput = [];
    while($row = mysqli_fetch_assoc($query)){
        $ouput[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($ouput);
?>