<header>
    <nav>
        <a class='logo' href='http://localhost/cityPortal'><img class='' src='http://localhost/cityPortal/src/logo.png' alt='logo'></a>
        <ul class='nav__links'>
        <?php
            echo isset($_SESSION['user'])?
             "<li><a class='links__link' href='//localhost/cityPortal/profile'>Личный кабинет</a></li><li><a class='links__link' href='//localhost/cityPortal/logout'>Выход</a></li>" 
            : "<li><a class='links__link' href='//localhost/cityPortal/login'>Авторизация</a></li><li><a class='links__link' href='//localhost/cityPortal/register'>Регистрация</a></li>";
        ?>
        </ul>
    </nav>
    
</header>
<?php

?>