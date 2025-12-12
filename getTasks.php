<?php
// прочитать содержимое файла tasks.txt
// в файле должно лежать примерно такое: "task1;task2;task3"
// полученную строку с заметками необходимо разделить по сепаратору ; на массив строк
// вернуть полученный массив в виде JSON

$filename = "tasks.txt";

if (file_exists($filename)) {
    $content = file_get_contents($filename);
    $content = rtrim($content, ';');
    $tasks = explode(';', $content);
    $tasks = array_filter($tasks);
    echo json_encode(array_values($tasks));
} else {
    echo json_encode([]);
}
?>