--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`( 
  `userId` MEDIUMINT(4) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `workorders`
--

DROP TABLE IF EXISTS `workorders`;
CREATE TABLE `workorders`(
    `orderId` MEDIUMINT(4) NOT NULL AUTO_INCREMENT,
    `userId` MEDIUMINT(4) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`orderId`),
    FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
    ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
INSERT INTO `users` (`name`, `email`, `password`) VALUES
  ('Mike Tyson','tigerface@boxing.com','$2a$10$V2ur5B37Gk1gBHBuvUO6Nu.ZWB9B4jNB8E3EBFCo2G7FqGSroOtaW'),
  ('Captain Kurk','kurk@starfleet.com','$2a$10$V2ur5B37Gk1gBHBuvUO6Nu.ZWB9B4jNB8E3EBFCo2G7FqGSroOtaW'),
  ('Tiger Woods','twoods@pga.com','$2a$10$V2ur5B37Gk1gBHBuvUO6Nu.ZWB9B4jNB8E3EBFCo2G7FqGSroOtaW')
  ;
UNLOCK TABLES;

--
-- Dumping data for table `workorders`
--

LOCK TABLES `workorders` WRITE;
INSERT INTO `workorders` (`userId`, `title`, `content`) VALUES
  ('1','Practice','Practice your regular boxing skills'),
  ('1','Feed Cat','Tiger likes steak for dinner'),
  ('2','Rescue Starfleet','Defeat Khan, jk Spock will do that'),
  ('3','Win golf tournament','Do lots of practice first')
  ;
UNLOCK TABLES;