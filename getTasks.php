<?php
$filename = "tasks.txt";

$file = fopen( $filename, !file_exists($filename)?"w+":"a+");

$tasks_list = explode(";", fgets($file));

echo json_encode($tasks_list);

?>