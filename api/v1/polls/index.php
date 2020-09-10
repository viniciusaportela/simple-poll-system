<?php
require_once(__DIR__ . '/PollController.php');
require_once(__DIR__ . '/../../core/Database.php');

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Content-type: application/json');

$controller = new PollController();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    $pollId = $_GET['pollId'];

    if (isset($pollId)) {
      $controller->get();
    } else {
      $controller->list();
    }

    break;

  case 'POST':
    $controller->create();
    break;

  case 'PUT':
    $controller->update();
    break;

  case 'DELETE':
    $controller->delete();
    break;

  default:
    echo 'default';
    break;
}
