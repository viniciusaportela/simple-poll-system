<?php
abstract class Controller
{
  protected $service;

  private function isValidJson($json)
  {
    json_decode($json);
    return json_last_error() == JSON_ERROR_NONE;
  }

  protected function json()
  {
    $input = file_get_contents('php://input');

    if (strlen($input) > 0 && $this->isValidJson($input)) {
      return json_decode($input);
    }
  }
}
