<?php
require_once(__DIR__ . '/../../core/Service.php');
require_once(__DIR__ . '/../poll-options/PollOptionService.php');

/**
 * Service of Poll
 * 
 * Poll Management at Database Level
 */
class PollService extends Service
{
  /**
   * Get a list of all current polls
   * separated by:
   * 
   * - going (current available for vote)
   * - finished (poll was already finished)
   * - soon (is going to happen in future)
   */
  public function list()
  {
  }

  /**
   * Creates a Poll with it's options
   */
  public function create($title, $dateStart, $dateEnd, $questions)
  {
    $pollOptionService = new PollOptionService($this->db);

    $this->db->beginTransaction();

    try {
      $createPollStatement = $this->db->prepare(
        "INSERT INTO `poll`(`title`, `date_start`, `date_end`) VALUES(?, ?, ?)"
      );

      $createPollStatement->execute(array($title, $dateStart, $dateEnd));

      $pollId = $this->db->lastInsertId();

      foreach ($questions as $question) {
        $pollOptionService->create($question, $pollId);
      }

      $this->db->commit();
    } catch (Exception $e) {
      $this->db->rollback();
      http_response_code(500);
    }
  }

  /**
   * Update a specific Poll
   */
  public function update($pollId, $title, $dateStart, $dateEnd, $questions)
  {
  }

  /**
   * Delete a specific Poll
   */
  public function delete($pollId)
  {
    $deleteStatement = $this->db->prepare(
      "DELETE FROM `poll` WHERE `id` = ?"
    );

    $deleteStatement->execute(array($pollId));
  }
}
