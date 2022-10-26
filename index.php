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
    <link type="image/x-icon" rel="shortcut icon" href="//localhost/cityPortal/src/logo.ico">
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
        <div class='loading-wrapper'><div class='loading'></div></div>
        
        <div class='proposals'>
            <template id='proposal-template'>
                <div class='proposal'>
                    <div class='proposal__upper-panel'>
                        <h2 class='proposal__name'>Название</h2>
                        <p class='proposal__time'>Март 10, 5:16</p>
                    </div>
                    <div class="proposal-image">
                        <img class='proposal__image proposal__image--open' src='#'>
                        <img class='proposal__after-image' src='#'>
                    </div>
                    <div class='proposal__lower-panel'>
                        <span class='proposal__category'>категория</span>
                    </div>
                </div>
            </template>
        </div>
        <p class='proposals-counter'>Количество решенных заявок: <span class='proposals-number'>0</span></p>

    </main>
   
</body>
</html>