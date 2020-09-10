CREATE TABLE `poll`
(
  `id` INT AUTO_INCREMENT,
  `title` VARCHAR(255),
  `date_start` DATE,
  `date_end` DATE,
  PRIMARY KEY(`id`)
)
ENGINE=InnoDB 
DEFAULT CHARACTER SET utf8mb4;