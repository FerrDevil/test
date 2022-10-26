<?php 
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Авторизация</title>
    <link type="image/x-icon" rel="shortcut icon" href="//localhost/cityPortal/src/logo.ico">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="../header.css">
    <script defer src="index.js"></script>
</head>
<body>
    <?php
        require_once('../modules/header.php')
    ?>
    <main>
        <h1>Авторизация</h1>
        <form method='POST' action='login.php'>
            <div class='input-wrapper'>
                <input class='input text-input' id='login' name='login' placeholder='Логин'>
                <span class = 'error'></span>
            </div>
            <div class='input-wrapper'>
                <input type='password' class='input text-input' id='password' name='password' placeholder='Пароль'>
                <span class = 'error'></span>
            </div>
            <button class='submit' type='submit'>Войти</button>
        </form>
    </main>
</body>
</html>