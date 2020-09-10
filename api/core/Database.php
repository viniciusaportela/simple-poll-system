<?php
class Database
{
  public $con;

  public function __construct()
  {
    require(__DIR__ . '/../config/index.php');

    $connectionParams = "mysql:host=" . $config['connection']['host'];
    $connectionParams .= ";dbname=" . $config['connection']['database'];

    $this->con = new PDO(
      $connectionParams,
      $config['connection']['user'],
      $config['connection']['password']
    );
  }
}
