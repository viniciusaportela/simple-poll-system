<?php
require_once(__DIR__ . '/./v1/polls/PollController.php');
require_once(__DIR__ . '/./core/Database.php');

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Server\Socket;

require dirname(__FILE__) . '/vendor/autoload.php';

$socket = new Socket();

$server = IoServer::factory(
  new HttpServer(
    new WsServer(
      $socket
    )
  ),
  8080
);

$server->loop->addPeriodicTimer(5, function () use ($socket) {
  echo '[periodicUpdate] Updating data to clients ...' . PHP_EOL;
  $db = new Database();
  $pollService = new PollService($db->con);

  foreach ($socket->listeners as $pollId => $clients) {
    $pollData = $pollService->get($pollId);

    foreach ($clients as $client) {
      $client->send(json_encode($pollData));
    }
  }
});

$server->run();
