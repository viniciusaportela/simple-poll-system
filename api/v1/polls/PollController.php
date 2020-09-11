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

  public function get()
  {
    $pollId = $_GET['pollId'];

    $poll = $this->service->get($pollId);

    echo json_encode($poll);
  }

  public function list()
  {
    $polls = $this->service->list();

    echo json_encode($polls);
  }

  public function create()
  {
    $body = $this->json();

    $pollId = $this->service->create(
      $body->title,
      $body->date_start,
      $body->date_end,
      $body->options
    );

    echo json_encode(['id' => $pollId]);

    http_response_code(201);
  }

  public function update()
  {
    $body = $this->json();

    if (isset($body)) {
      $this->service->update(
        $body->poll_id,
        $body->title,
        $body->date_start,
        $body->date_end,
        $body->options
      );
    } else {
      http_response_code(500);
    }
  }

  public function delete()
  {
    $body = $this->json();

    if (isset($body)) {
      $this->service->delete(
        $body->poll_id
      );
    } else {
      http_response_code(500);
    }
  }
}
