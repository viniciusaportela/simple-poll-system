<?php
abstract class Controller
{
  protected $service;

  /**
   * Converts the Input into a JSON
   * 
   * this doesn't verify if the ```php://input``` is a
   * valid JSON, first validate with **Validator** and **ValidatorChain**
   */
  protected function json()
  {
    $input = file_get_contents('php://input');
    return json_decode($input);
  }

  /**
   * Tries to execute a function
   * 
   * If any Error was Caught then the script is stopped and
   * a ```error 500``` is returned
   */
  protected function try($function)
  {
    try {
      $function();
    } catch (\Throwable $th) {
      http_response_code(500);

      exit();
    }
  }
}
