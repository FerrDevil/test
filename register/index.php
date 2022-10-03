<?php 
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Регистрация</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="../header.css">
    <script defer src='index.js'></script>
</head>
<body>
    <?php
        require_once('../modules/header.php')
    ?>
    <main>
        <h1>Регистрация</h1>
        <form method='POST' action='register.php'>
            <input class='input text-input' id='fio' name='fio' placeholder='Фамилия Имя Отчество'>
            <input class='input text-input' id='login' name='login' placeholder='Логин'>
            <input class='input text-input' id='email' name='email' placeholder='Email'>
            <input class='input text-input' id='password' name='password' placeholder='Пароль'>
            <input class='input text-input' id='confirmPassword' placeholder='Повтор пароля'>
            
            <label class='agreement-wrapper'>
                <input class='input checkbox' id='agreement' type='checkbox' name='agreement'>
                <p class='agreement__label'>Согласие на обработку персональных данных</p>
            </label>
            <button class='submit' type='submit'>Зарегистрироваться</button>
        </form>
    </main>
</body>
</html>