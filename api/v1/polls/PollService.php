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
   * Get data from a specific poll
   * 
   * returns the poll and it's options
   */
  public function get($pollId)
  {
    $getStatement = $this->db->prepare(
      "SELECT 
          `poll`.*,
          (
            SELECT COUNT(`poll_vote`.`id`)
            FROM `poll_vote`
            INNER JOIN `poll_option` ON `poll_option`.`id` = `poll_vote`.`poll_option_id`
            WHERE `poll_option`.`poll_id` = `poll`.`id`
          ) AS `votes`,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', `poll_option`.`id`,
              'value', `poll_option`.`value`,
              'votes', (
                SELECT COUNT(`pv`.`id`)
                FROM `poll_vote` `pv`
                WHERE `pv`.`poll_option_id` = `poll_option`.`id`
              )
            )
          ) AS `options`
        FROM `poll` 
        LEFT JOIN `poll_option` ON `poll`.`id` = `poll_option`.`poll_id`
        WHERE `poll`.`id` = ?
        GROUP BY `poll`.`id`
      "
    );

    $getStatement->execute(array($pollId));

    $res = $getStatement->fetch(PDO::FETCH_ASSOC);

    return array(
      "id" => intval($res['id']),
      "title" => $res['title'],
      "date_start" => $res['date_start'],
      "date_end" => $res['date_end'],
      "votes" => intval($res['votes']),
      "options" => json_decode($res['options']),
    );
  }

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
    $goingQuery = $this->db->query(
      "SELECT `poll`.*, 
      (
        SELECT COUNT(`poll_vote`.`id`)
        FROM `poll_vote`
        INNER JOIN `poll_option` ON `poll_option`.`id` = `poll_vote`.`poll_option_id`
        WHERE `poll_option`.`poll_id` = `poll`.`id`
      ) AS `votes`
      FROM `poll`
      WHERE CURDATE() BETWEEN `date_start` AND `date_end`
      GROUP BY `poll`.`id`
      "
    );
    $going = $goingQuery->fetchAll(PDO::FETCH_ASSOC);

    $finishedQuery = $this->db->query(
      "SELECT `poll`.*, 
      (
        SELECT COUNT(`poll_vote`.`id`)
        FROM `poll_vote`
        INNER JOIN `poll_option` ON `poll_option`.`id` = `poll_vote`.`poll_option_id`
        WHERE `poll_option`.`poll_id` = `poll`.`id`
      ) AS `votes`
      FROM `poll`
      WHERE `date_end` < CURDATE()
      GROUP BY `poll`.`id`
      "
    );
    $finished = $finishedQuery->fetchAll(PDO::FETCH_ASSOC);

    $soonQuery = $this->db->query(
      "SELECT `poll`.*, 
      (
        SELECT COUNT(`poll_vote`.`id`)
        FROM `poll_vote`
        INNER JOIN `poll_option` ON `poll_option`.`id` = `poll_vote`.`poll_option_id`
        WHERE `poll_option`.`poll_id` = `poll`.`id`
      ) AS `votes`
      FROM `poll`
      WHERE `date_start` > CURDATE()
      GROUP BY `poll`.`id`
      "
    );
    $soon = $soonQuery->fetchAll(PDO::FETCH_ASSOC);

    return [
      "going" => $going,
      "finished" => $finished,
      "soon" => $soon
    ];
  }

  /**
   * Creates a Poll with it's options
   */
  public function create($title, $dateStart, $dateEnd, $options)
  {
    $pollOptionService = new PollOptionService($this->db);

    $this->db->beginTransaction();

    try {
      $createPollStatement = $this->db->prepare(
        "INSERT INTO `poll`(`title`, `date_start`, `date_end`) VALUES(?, ?, ?)"
      );

      $createPollStatement->execute(array($title, $dateStart, $dateEnd));

      $pollId = $this->db->lastInsertId();

      foreach ($options as $option) {
        $pollOptionService->create($option, $pollId);
      }

      $this->db->commit();

      return (int)$pollId;
    } catch (Exception $e) {
      $this->db->rollback();
      http_response_code(500);
    }
  }

  /**
   * Update a specific Poll
   */
  public function update($pollId, $title, $dateStart, $dateEnd, $options)
  {
    $updateStatement =
      $this->db->prepare(
        "UPDATE `poll` 
      SET `title` = ?, `date_start` = ?, `date_end` = ?
      WHERE `id` = ?
      "
      );

    $updateStatement->execute(array($title, $dateStart, $dateEnd, $pollId));

    $addOptionStatement =
      $this->db->prepare(
        "INSERT INTO `poll_option`(`value`, `poll_id`)
      VALUES(?, ?)
      "
      );
    foreach ($options->add as $add) {
      $addOptionStatement->execute(array($add, $pollId));
    }

    // Execute Options Instructions
    $updateOptionStatement = $this->db->prepare(
      "UPDATE `poll_option` 
      INNER JOIN `poll` ON `poll`.`id` = `poll_option`.`poll_id`
      SET `value` = ?
      WHERE `poll_option`.`id` = ? AND `poll`.`id` = ?
      "
    );
    foreach ($options->edit as $edit) {
      $updateOptionStatement->execute(array($edit->value, $edit->id, $pollId));
    }

    $removeOptionStatement = $this->db->prepare(
      "DELETE `poll_option`.* FROM `poll_option`
      INNER JOIN `poll`
      ON `poll`.`id` = `poll_option`.`poll_id`
      WHERE `poll_option`.`id` = ?
      AND `poll`.`id` = ?
      "
    );
    foreach ($options->remove as $remove) {
      $removeOptionStatement->execute(array($remove, $pollId));
    }
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
