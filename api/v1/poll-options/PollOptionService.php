<?php
require_once(__DIR__ . '/../../core/Service.php');

/**
 * Service of PollOption
 * 
 * PollOption Management at Database Level
 */
class PollOptionService extends Service
{
  /**
   * Creates a PollOption related to one Poll
   */
  function create($name, $pollId)
  {
    $createPollQuestion = $this->db->prepare(
      "INSERT INTO `poll_option`(`value`, `poll_id`) VALUES(?, ?)"
    );

    $createPollQuestion->execute(array($name, $pollId));
  }
}
