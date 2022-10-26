<?php
    $category = $_POST['category-name'];
    $db = mysqli_connect('localhost', 'root', 'root', 'cityportal');
    $query = mysqli_query($db, "INSERT INTO `categories` (`categoryId`, `categoryName`) VALUES (NULL, '$category')");
    header('Location: ./')
?>