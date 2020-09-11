<?php
require_once(__DIR__ . '/../../core/Service.php');
require_once(__DIR__ . '/../../core/ApiError.php');

class PollVoteService extends Service
{
  public function create($optionId)
  {
    $isInsideDateRange =
      $this->db->prepare(
        "SELECT * FROM `poll`
        INNER JOIN `poll_option` ON `poll_option`.`poll_id` = `poll`.`id`
        WHERE `poll_option`.`id` = ? AND CURDATE() BETWEEN `poll`.`date_start` AND `poll`.`date_end`
        "
      );

    $isInsideDateRange->execute(array($optionId));

    if ($isInsideDateRange->rowCount() === 0) {
      http_response_code(422);

      echo json_encode([
        "error" => ApiError::$INVALID_DATE,
        "description" => "you can't vote in a poll that is in future or past"
      ]);

      exit();
    }

    $createPollVoteStatement = $this->db->prepare(
      "INSERT INTO `poll_vote`(`poll_option_id`) VALUES(?)"
    );

    $createPollVoteStatement->execute(array($optionId));
  }
}
