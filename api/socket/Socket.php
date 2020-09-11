<?php

namespace Server;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Socket implements MessageComponentInterface
{
  public $listeners = [];

  public function __construct()
  {
    $this->clients = new \SplObjectStorage;
  }

  public function onOpen(ConnectionInterface $conn)
  {
    $this->clients->attach($conn);

    echo '[onOpen] Client trying to connect' . PHP_EOL;

    $queryString = $conn->httpRequest->getUri()->getQuery();

    preg_match("#pollId=(\d{1,})#", $queryString, $matches);

    $pollId = count($matches) > 0 ? $matches[1] : NULL;

    if (isset($pollId)) {
      // Create Dictionary if doesn't exists yet
      if (!array_key_exists($pollId, $this->listeners)) {
        echo '[onOpen] start watching ' . $pollId . PHP_EOL;
        $this->listeners[$pollId] = [];
      }

      echo '[onOpen] Attach to listener ' . $pollId . PHP_EOL;

      array_push($this->listeners[$pollId], $conn);

      $this->clients->attach($conn);
    } else {
      echo '[onOpen] No pollId provided in query' . PHP_EOL;
      $conn->close();
    }
  }

  public function onMessage(ConnectionInterface $from, $msg)
  {
  }

  public function onClose(ConnectionInterface $conn)
  {
    $this->clients->detach($conn);

    // Remove from listeners
    foreach ($this->listeners as $pollId => $clients) {
      if (($key = array_search($conn, $clients)) !== false) {
        unset($this->listeners[$pollId][$key]);
      }
    }
  }

  public function onError(ConnectionInterface $conn, \Exception $e)
  {
  }
}
