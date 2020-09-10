<?php
require_once(__DIR__ . '/../../core/Controller.php');
require_once(__DIR__ . '/./PollService.php');

class PollController extends Controller
{
  function __construct()
  {
    $database = new Database();
    $this->service = new PollService($database->con);
  }

  public function list()
  {
    $this->service->list();
  }

  public function create()
  {
    $body = $this->json();

    $this->service->create(
      $body->title,
      $body->date_start,
      $body->date_end,
      $body->options
    );

    http_response_code(201);
  }

  public function update()
  {
  }

  public function delete()
  {
    $body = $this->json();

    $this->service->delete(
      $body->poll_id
    );
  }
}
