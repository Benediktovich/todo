<?php
$filename = "tasks.txt";

$file = fopen($filename, !file_exists($filename) ? 'w' : 'a+');

fwrite($file, $_POST["task_title"] . ";");

fclose($file);

echo "OK";
?>