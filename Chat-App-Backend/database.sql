-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.46 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.17.0.7270
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for chat_app
CREATE DATABASE IF NOT EXISTS `chat_app` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `chat_app`;

-- Dumping structure for table chat_app.chat
CREATE TABLE IF NOT EXISTS `chat` (
  `chat_id` int NOT NULL AUTO_INCREMENT,
  `user_1` varchar(10) NOT NULL,
  `user_2` varchar(10) NOT NULL,
  PRIMARY KEY (`chat_id`),
  KEY `fk_chat_user_idx` (`user_1`),
  KEY `fk_chat_user1_idx` (`user_2`),
  CONSTRAINT `fk_chat_user` FOREIGN KEY (`user_1`) REFERENCES `user` (`mobile`),
  CONSTRAINT `fk_chat_user1` FOREIGN KEY (`user_2`) REFERENCES `user` (`mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table chat_app.chat: ~2 rows (approximately)
INSERT INTO `chat` (`chat_id`, `user_1`, `user_2`) VALUES
	(1, '0713018095', '0718186333'),
	(2, '0713018033', '0713018095');

-- Dumping structure for table chat_app.chat_history
CREATE TABLE IF NOT EXISTS `chat_history` (
  `chat_history_id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(45) NOT NULL,
  `sent_at` datetime NOT NULL,
  `chat_chat_id` int NOT NULL,
  `sender` varchar(10) NOT NULL,
  `msg_status_id` int NOT NULL,
  PRIMARY KEY (`chat_history_id`),
  KEY `fk_chat_history_chat1_idx` (`chat_chat_id`),
  KEY `fk_chat_history_user1_idx` (`sender`),
  KEY `fk_chat_history_msg_status1_idx` (`msg_status_id`),
  CONSTRAINT `fk_chat_history_chat1` FOREIGN KEY (`chat_chat_id`) REFERENCES `chat` (`chat_id`),
  CONSTRAINT `fk_chat_history_msg_status1` FOREIGN KEY (`msg_status_id`) REFERENCES `msg_status` (`id`),
  CONSTRAINT `fk_chat_history_user1` FOREIGN KEY (`sender`) REFERENCES `user` (`mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table chat_app.chat_history: ~2 rows (approximately)
INSERT INTO `chat_history` (`chat_history_id`, `message`, `sent_at`, `chat_chat_id`, `sender`, `msg_status_id`) VALUES
	(1, 'adad', '2026-06-09 23:03:43', 1, '0713018095', 1),
	(2, 'bawdawd', '2026-06-09 23:03:57', 2, '0718186333', 1),
	(3, 'aaaa', '2026-06-15 19:49:54', 2, '0713018033', 1),
	(4, 'bbbb', '2026-06-15 20:02:37', 2, '0718186333', 1),
	(5, 'bbbb', '2026-06-15 21:11:19', 2, '0718186333', 1);

-- Dumping structure for table chat_app.msg_status
CREATE TABLE IF NOT EXISTS `msg_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table chat_app.msg_status: ~2 rows (approximately)
INSERT INTO `msg_status` (`id`, `status`) VALUES
	(1, 'Read'),
	(2, 'Unread');

-- Dumping structure for table chat_app.user
CREATE TABLE IF NOT EXISTS `user` (
  `mobile` varchar(10) NOT NULL,
  `fname` varchar(45) NOT NULL,
  `lname` varchar(45) NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table chat_app.user: ~3 rows (approximately)
INSERT INTO `user` (`mobile`, `fname`, `lname`, `password`) VALUES
	('0713018033', 'pathum', 'nissanka', '123321444'),
	('0713018095', 'Chinthaka', 'Sandaruwan', '123321555'),
	('0718186333', 'Pabasara', 'Bathrajith', '0713018080');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
