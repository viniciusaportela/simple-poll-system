<?php
require_once(__DIR__ . '/../../core/Controller.php');
require_once(__DIR__ . '/./PollVoteService.php');
require_once(__DIR__ . '/./PollVoteValidator.php');

class PollVoteController extends Controller
{
  public function __construct()
  {
    $database = new Database();
    $this->service = new PollVoteService($database->con);
    $this->validator = new PollVoteValidator();
  }

  public function create()
  {
    $this->validator->create();

    $body = $this->json();

    $this->service->create($body->option_id);

    http_response_code(201);
  }
}
