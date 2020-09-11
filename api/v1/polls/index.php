<?php
require_once(__DIR__ . '/PollController.php');

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Content-type: application/json');

$controller = new PollController();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    if (isset($_GET['pollId'])) {
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

  case 'OPTIONS':
    return 0;
    break;

  default:
    http_response_code(404);
    break;
}
