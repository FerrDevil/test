<?php 
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Главная</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="header.css">
    <script defer src="index.js"></script>
</head>
<body>
    <?php
        include "./modules/header.php";
    ?>
    <main>
        <h1 class='title'>Последние выполненные работы</h1>
        <div class='proposals'>
            <template id='proposal-template'>
                <div class='proposal'>
                    <div class='proposal__upper-panel'>
                        <h2 class='proposal__name'>Название</h2>
                        <p class='proposal__time'>Март 10, 5:16</p>
                    </div>
                <img class='proposal__image' src='#'>
                <p class='proposal__category'>категория</p>
                </div>
            </template>
        </div>
        <p class='proposals-counter'>Количество решенных заявок: <span class='proposals-number'>0</span></p>

    </main>
   
</body>
</html>