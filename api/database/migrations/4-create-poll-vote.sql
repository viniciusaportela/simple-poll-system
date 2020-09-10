CREATE TABLE `poll_vote`
(
  `id` INT NOT NULL
  AUTO_INCREMENT,
  `poll_option_id` INT NOT NULL,
  CONSTRAINT PRIMARY KEY(`id`),
  CONSTRAINT `fk_poll_vote_poll_option` FOREIGN KEY (`poll_option_id`) REFERENCES `poll_option`(`id`)
		ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARACTER SET utf8mb4;
