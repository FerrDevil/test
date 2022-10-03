<?php
    session_start();
    $fio = $_POST['fio'];
    $login = $_POST['login'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    $db = mysqli_connect('localhost', 'root', 'root', 'cityportal');
    mysqli_query($db, "INSERT INTO `users` (`id`, `fio`, `login`, `email`, `password`, `isAdmin`) VALUES (NULL, '". $fio ."', '". $login ."', '". $email ."', '". $password ."', '0')");
    $_SESSION['user'] = mysqli_fetch_assoc(mysqli_query($db, "SELECT * FROM `users` WHERE `login` = '" . $login . "'"));
    header('Location: ../index.php');

?>