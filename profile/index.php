<?php 
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Личный кабинет</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="../header.css">
    <script defer src="index.js"></script>
    <link type="image/x-icon" rel="shortcut icon" href="//localhost/cityPortal/src/logo.ico">
</head>
<body>
    <?php
        require_once('../modules/header.php')
    ?>
    <main>
        <?php
        
            echo $_SESSION['user']['isAdmin'] == 0 ? 
            "<h1>Ваши заявки</h1><div class='settings'><div class='proposals-filter'><div class='proposals-filter__button'><img src='//localhost/cityPortal/src/ui/filter.png' class='proposals-filter__image' alt='filter-image'><span class='proposals-filter__text'>Фильтры</span></div><div class='proposals-filter__choices'></div>    </div><a href='addProposal' class='add-proposal'><span class='add-proposal__text'>Добавить заявку</span> <img class='add-proposal__image' src='//localhost/cityPortal/src/ui/add.svg'></a></div>" :
            "<h1 class='new-proposals'>Заявки</h1><div class='settings'><div class='proposals-filter'><div class='proposals-filter__button'><img src='//localhost/cityPortal/src/ui/filter.png' class='proposals-filter__image' alt='filter-image'><span class='proposals-filter__text'>Фильтры</span></div><div class='proposals-filter__choices'></div></div><button class='remove-category'>Категории</button><a href='addProposal' class='add-proposal'><span class='add-proposal__text'>Добавить заявку</span> <img class='add-proposal__image' src='//localhost/cityPortal/src/ui/add.svg'></a></div>";
        ?>
        
            
        <form class="confirmation" method="POST" action="postResolved.php" enctype="multipart/form-data">
            <img class="confirmation__close" src="//localhost/cityPortal/src/ui/close.svg">
            <input type="hidden" name='proposal-id' id='proposal-id'>
            <label class="file-input-wrapper" for='file-input'>
                <span class="file-input__button">Выберите изображение... <span class='filename'></span></span>
            </label>
            <div class='input-wrapper'>
                <input type='file' class='input file-input' id='file-input' name='file-input'>
                <span class = 'error'></span>
            </div>
            <button class="submit">Отправить</button>
        </form>

        <form class="category-add" method="POST" action="addCategory.php" enctype="multipart/form-data">
            <img class="category-add__close" src="//localhost/cityPortal/src/ui/close.svg">
            <div class='input-wrapper'>
                <input class='input text-input' id='category-name' name='category-name' placeholder="Название категории">
                <span class = 'error'></span>
            </div>
            <button class="submit">Добавить</button>
        </form>
        <div class="categories-wrapper">
            <button class='add-category'>Добавить категорию</button>
            <div class="categories">

            </div>
        </div>
        <div class='loading'></div>
        <div class="user-proposals">
            <template id="user-proposal-template">
                <div class="user-proposal">
                    <div class="delete-proposal">
                        <span class='delete-proposal__text'>Удалить</span>
                        <img class='delete-proposal__image' src="//localhost/cityPortal/src/ui/delete.svg">
                    </div>
                    <div class='proposal__upper-panel'>
                        <h2 class='proposal__name'>Название</h2>
                        <p class='proposal__time'>Март 10, 5:16</p>
                    </div>
                    <p class="proposal__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                    <img class='proposal__image' src='#'>
                    <div class="proposal__lower-panel">
                        <span class='proposal__category'>категория</span>
                        <div class='proposal__state'>
                            <span class='state__name'>Новая</span>
                            <img class='state__image' src='' alt='state-image'>
                            <input type="hidden" id="status">
                        </div>
                    </div>
                </div>
            </template>
            <template id="new-proposal-template">
                <div class="user-proposal">
                    <div class='proposal__upper-panel'>
                        <h2 class='proposal__name'>Название</h2>
                        <p class='proposal__time'>Март 10, 5:16</p>
                    </div>
                    <p class="proposal__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                    <img class='proposal__image' src='#'>
                    <div class="proposal__lower-panel">
                        <span class='proposal__category'>категория</span>
                        <div class="state-choice">
                            <div class='proposal__state'>
                                <span class='state__name'>Новая</span>
                                <img class='state__image' src='' alt='state-image'>
                                <img class="choice__arrow" src='//localhost/cityPortal/src/ui/downArrow.png' alt="arrow">
                            </div>
                            <input class="input" id="status" type="hidden" name="status">
                            <div class="statuses"></div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </main>
</body>
</html>