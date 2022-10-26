<?php
    header('Content-Type: application/json');
    
    $db = mysqli_connect('localhost', 'root', 'root', 'cityportal');
    $query = mysqli_query($db, "SELECT *  FROM `categories`");
    $ouput = [];
    while($row = mysqli_fetch_assoc($query)){
        $ouput[] = $row;
    }
    
    echo json_encode($ouput);
?>