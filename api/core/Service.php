<?php
require_once(__DIR__ . '/./Database.php');

abstract class Service
{
  protected $db;

  public function __construct($database)
  {
    $this->db = $database;
  }
}
