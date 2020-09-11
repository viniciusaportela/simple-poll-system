<?php
require_once(__DIR__ . '/../../core/Validator.php');

class PollVoteValidator extends Validator
{
  public function create()
  {
    $body = $this->validateBodyAndReturn();

    $this
      ->validate('option_id', $body, 'BODY')
      ->exists()
      ->isInt();
  }
}
