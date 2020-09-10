<?php
require_once(__DIR__ . '/PollController.php');
require_once(__DIR__ . '/../../core/Database.php');

$controller = new PollController();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    $controller->list();
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
    http_response_code(404);
    break;
}
