<?php
require_once(__DIR__ . '/../../core/Validator.php');

class PollValidator extends Validator
{
  public function get()
  {
    $this
      ->validate('pollId', $_GET['pollId'])
      ->exists();
  }

  public function create()
  {
    $body = $this->validateBodyAndReturn();

    $this
      ->validate('title', $body, 'BODY')
      ->exists()
      ->stringNotEmpty();

    $this
      ->validate('date_start', $body, 'BODY')
      ->exists()
      ->isValidDate();

    $this
      ->validate('date_end', $body, 'BODY')
      ->exists()
      ->isDateHigherOrEqualThan($body['date_start']);

    $this
      ->validate('options', $body, 'BODY')
      ->exists()
      ->isArrayLengthHigher(2); // higher than 2 => 3 or more
  }

  public function update()
  {
    $body = $this->validateBodyAndReturn();

    $this
      ->validate('title', $body, 'BODY')
      ->exists()
      ->stringNotEmpty();

    $this
      ->validate('date_start', $body, 'BODY')
      ->exists()
      ->isValidDate();

    $this
      ->validate('date_end', $body, 'BODY')
      ->exists()
      ->isDateHigherOrEqualThan($body['date_start']);

    $this
      ->validate('options', $body, 'BODY')
      ->exists()
      ->hasKey('add')
      ->hasKey('edit')
      ->hasKey('remove');
  }

  public function delete()
  {
    $body = $this->validateBodyAndReturn();

    $this
      ->validate('poll_id', $body, 'BODY')
      ->exists()
      ->isInt();
  }
}
