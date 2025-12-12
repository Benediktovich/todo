<?php
$filename = "todo/tasks.txt";

// Open file for appending (create if doesn't exist)
$file = fopen($filename, file_exists($filename) ? 'a' : 'w');

// Check if task_title exists in POST
if (isset($_POST["task_title"]) && !empty($_POST["task_title"])) {
    $task = trim($_POST["task_title"]);
    fwrite($file, $task . ";");
    fclose($file);
    echo "OK";
} else {
    echo "No task provided";
}
?>