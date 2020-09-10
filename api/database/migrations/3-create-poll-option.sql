CREATE TABLE `poll_option`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `value` VARCHAR(60) NOT NULL,
  `poll_id` INT NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT `fk_poll_option_poll` FOREIGN KEY (`poll_id`) REFERENCES `poll`(`id`)
		ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE=InnoDB 
DEFAULT CHARACTER SET utf8
COLLATE utf8_general_ci;
