<?php
require_once(__DIR__ . '/./ApiError.php');
require_once(__DIR__ . '/./ValidatorChain.php');

abstract class Validator
{
  /**
   * Creates a Validation Chain with given value
   */
  public function validate($name, $value, $valueType = 'PURE')
  {
    return new ValidatorChain($name, $value, $valueType);
  }

  /**
   * Checks if the body is in JSON Format, if so, return it
   */
  public function validateBodyAndReturn()
  {
    $input = file_get_contents('php://input');
    json_decode($input);

    if (strlen($input) > 0 && json_last_error() == JSON_ERROR_NONE) {
      return json_decode($input, true);
    } else {
      echo json_encode([
        "error" => ApiError::$INVALID_BODY
      ]);

      http_response_code(422);

      exit();
    }
  }
}
