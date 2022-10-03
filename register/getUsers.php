<?php
    $db = mysqli_connect('localhost', 'root', 'root', 'cityportal');
    $query = mysqli_query($db, "SELECT * FROM `users`");
    $ouput = [];
    while($row = mysqli_fetch_assoc($query)){
        $ouput[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($ouput);
?>