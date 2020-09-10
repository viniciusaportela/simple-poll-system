<?php
require_once(__DIR__ . '/PollVoteController.php');
require_once(__DIR__ . '/../../core/Database.php');

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Content-type: application/json');

$pollVoteController = new PollVoteController();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'POST':
    $pollVoteController->create();
    break;

  case 'OPTIONS':
    return 0;

  default:
    http_response_code(404);
    break;
}
