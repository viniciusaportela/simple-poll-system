<?php
require_once(__DIR__ . '/PollVoteController.php');
require_once(__DIR__ . '/../../core/Database.php');

$pollVoteController = new PollVoteController();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'POST':
    $pollVoteController->create();
    break;

  default:
    http_response_code(404);
    break;
}
