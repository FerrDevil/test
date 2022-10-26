<?php
define ('SITE_ROOT', realpath(dirname('../../src/uploads/')));
session_start();
$name = $_POST['name'];
$description = $_POST['description'];
$category = $_POST['category'];

$user_id = $_SESSION['user']['id'];
$date = date("F j, g:i a");
$image = '';

if (isset($_FILES['file-input'])){
    $tmp_name = $_FILES['file-input']['tmp_name'];
    $file_name = basename( $_FILES['file-input']['name']);
    $image =  str_replace('\\', '/', SITE_ROOT . "/uploads/$file_name");

    move_uploaded_file($tmp_name, $image);

    $image = str_replace('C:/OpenServer/domains','/' , $image);
}

$db = mysqli_connect('localhost', 'root', 'root', 'cityportal');
mysqli_query($db, "INSERT INTO `proposals` (`id`, `userId`, `name`, `time`, `description`, `initialImage`, `secondImage`, `categoryId`, `status`) VALUES (NULL, $user_id, '$name', '$date', '$description', '$image', '', $category, 'pending')");
header('Location: ../');
?>