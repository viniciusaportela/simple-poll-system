<?php
require_once(__DIR__ . '/../../core/Service.php');

class PollVoteService extends Service
{
  public function create($optionId)
  {
    echo $optionId;

    $createPollVoteStatement = $this->db->prepare(
      "INSERT INTO `poll_vote`(`poll_option_id`) VALUES(?)"
    );

    $createPollVoteStatement->execute(array($optionId));
  }
}
