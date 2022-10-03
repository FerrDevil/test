<?php 
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Создание заявки</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="../../header.css">
    <script defer src="index.js"></script>
</head>
<body>
    <?php
        require_once('../../modules/header.php')
    ?>
    <main>
    <h1>Создание заявки</h1>
        <form method='POST' action='addProposal.php' enctype="multipart/form-data">
            <input class='input text-input' id='name' name='name' placeholder='Название'>
            <div class="choice">
                <div class="choice-button">
                    <button class="choice__button" type='button'>Категория</button>
                    <img class="choice__arrow" src='//localhost/cityPortal/src/ui/downArrow.png' alt="arrow">
                </div>
                <input class="input" id="category" type="hidden" name="category">
                <div class="categories"></div>
            </div>
            <textarea class='input textarea' id='description' name='description' placeholder='Описание'></textarea>
            <input type='file' class='input file-input' id='file-input' name='file-input'>
            <label class="file-input-wrapper" for='file-input'>
                <span class="file-input__button">Выберите изображение... <span class='filename'></span></span>
            </label>
            <button class='submit' type='submit'>Создать</button>
        </form>
    </main>
</body>
</html>