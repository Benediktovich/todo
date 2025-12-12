<?php
header('Content-Type: application/json');

$filename = "todo/tasks.txt";

if (file_exists($filename)) {
    // Read file content
    $content = file_get_contents($filename);
    
    // Remove trailing semicolon and split into array
    $content = rtrim($content, ';');
    $tasks = explode(';', $content);
    
    // Filter out empty values
    $tasks = array_filter($tasks, function($task) {
        return !empty(trim($task));
    });
    
    // Reset array indices
    $tasks = array_values($tasks);
    
    echo json_encode($tasks);
} else {
    echo json_encode([]);
}
?>