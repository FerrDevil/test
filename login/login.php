<?php
    $login = $_POST['login'];
    $password = $_POST['password'];
    
    $db = mysqli_connect('localhost', 'root', 'root', 'cityportal');
    session_start();
    $query = mysqli_query($db, "SELECT * FROM `users` WHERE `login` = '" . $login . "' AND `password` = '" . $password . "'");
    $output = [];
    
    while($row = mysqli_fetch_assoc($query)){
        $output[] = $row;
    }

    if (count($output) == 1){
        $_SESSION['user'] = $output[0];
        header('Location: ../profile');
    }
    else{
        header('Location: ./');
    }
    

?>