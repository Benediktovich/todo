<?php
$filename = "tasks.txt";

$file = fopen( $filename, !file_exists($filename)?"w+":"a+");

// print_r( $_POST["task_title"]); // $_GET $_REQUEST

fputs($file, $_POST["task_title"] . ";");

fclose($file);

return "Ok";

// ["ключ"=>"значение"]

?>