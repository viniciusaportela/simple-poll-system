<?php
require_once(__DIR__ . '/../../core/Controller.php');
require_once(__DIR__ . '/./PollService.php');
require_once(__DIR__ . '/./PollValidator.php');

class PollController extends Controller
{
  function __construct()
  {
    $database = new Database();
    $this->service = new PollService($database->con);
    $this->validator = new PollValidator();
  }

  public function get()
  {
    $this->try(function () {
      $this->validator->get();

      $pollId = $_GET['pollId'];

      $poll = $this->service->get($pollId);

      echo json_encode($poll);
    });
  }

  public function list()
  {
    $this->try(function () {
      $polls = $this->service->list();

      echo json_encode($polls);
    });
  }

  public function create()
  {
    $this->try(function () {
      $this->validator->create();

      $body = $this->json();

      $pollId = $this->service->create(
        $body->title,
        $body->date_start,
        $body->date_end,
        $body->options
      );

      echo json_encode(['id' => $pollId]);

      http_response_code(201);
    });
  }

  public function update()
  {
    $this->try(function () {
      $this->validator->update();

      $body = $this->json();

      $this->service->update(
        $body->poll_id,
        $body->title,
        $body->date_start,
        $body->date_end,
        $body->options
      );
    });
  }

  public function delete()
  {
    $this->try(function () {
      $this->validator->delete();

      $body = $this->json();

      $this->service->delete(
        $body->poll_id
      );
    });
  }
}
