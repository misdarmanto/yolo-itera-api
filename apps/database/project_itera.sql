-- Adminer 4.8.1 MySQL 5.5.5-10.6.11-MariaDB-0ubuntu0.22.04.1 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `project_itera`;
CREATE DATABASE `project_itera` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `project_itera`;

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `photo` varchar(250) NOT NULL,
  `role` varchar(50) NOT NULL,
  `deleted` tinyint(4) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_on` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `photo`, `role`, `deleted`, `created_on`, `modified_on`) VALUES
(1,	'misdar',	'email@mail.com',	'7110eda4d09e062aa5e4a390b0a572ac0d2c0220',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	'admin',	1,	'2022-11-22 00:00:00',	'2023-02-01 15:59:46'),
(2,	'test',	'mail@mail.com',	'b1b3773a05c0ed0176787a4f1574ff0075f7521e',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	'super admin',	1,	'2022-11-22 00:00:00',	'2023-02-01 14:38:15'),
(8,	'Mac',	'mac@mail.com',	'b1b3773a05c0ed0176787a4f1574ff0075f7521e',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	'super admin',	1,	'2022-12-07 00:00:00',	'2023-02-01 14:39:15'),
(9,	'Tomi',	'tomi@mail.com',	'b1b3773a05c0ed0176787a4f1574ff0075f7521e',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	'admin',	1,	'2022-12-08 00:00:00',	'2023-02-01 14:40:01'),
(10,	'Jack',	'Jack@mail.com',	'b1b3773a05c0ed0176787a4f1574ff0075f7521e',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	'super admin',	0,	'2022-12-08 00:00:00',	'2023-02-01 15:57:43'),
(11,	'superadmin',	'superadmin@mail.com',	'b1b3773a05c0ed0176787a4f1574ff0075f7521e',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	'super admin',	0,	'2023-01-25 15:05:07',	'2023-02-02 01:35:54'),
(12,	'user 1',	'user@mail.com',	'b1b3773a05c0ed0176787a4f1574ff0075f7521e',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	'superAdmin',	1,	'2023-02-01 14:54:06',	'2023-02-01 14:54:37'),
(13,	'user test sss',	'user@mail.com',	'b1b3773a05c0ed0176787a4f1574ff0075f7521e',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	'admin',	0,	'2023-02-01 14:54:06',	'2023-02-01 15:39:23'),
(14,	'Jack',	'Jack@mail.com',	'b1b3773a05c0ed0176787a4f1574ff0075f7521e',	'http://photo.com',	'super admin',	1,	'2023-02-01 15:50:40',	'2023-02-02 01:40:24'),
(15,	'admin',	'admin@mail.com',	'b1b3773a05c0ed0176787a4f1574ff0075f7521e',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	'admin',	0,	'2023-02-02 01:33:28',	NULL)
ON DUPLICATE KEY UPDATE `id` = VALUES(`id`), `name` = VALUES(`name`), `email` = VALUES(`email`), `password` = VALUES(`password`), `photo` = VALUES(`photo`), `role` = VALUES(`role`), `deleted` = VALUES(`deleted`), `created_on` = VALUES(`created_on`), `modified_on` = VALUES(`modified_on`);

DROP TABLE IF EXISTS `traffic`;
CREATE TABLE `traffic` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `vehicle_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `photo` text NOT NULL,
  `check_in` varchar(200) NOT NULL,
  `check_out` varchar(200) NOT NULL,
  `created_on` date NOT NULL,
  `modified_on` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(250) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `rfid` bigint(20) NOT NULL,
  `deleted` tinyint(4) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_on` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `name` varchar(250) NOT NULL,
  `register_as` varchar(250) NOT NULL,
  `photo` varchar(250) NOT NULL,
  `photo_identity` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `user_sessions`;
CREATE TABLE `user_sessions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_on` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted` tinyint(4) NOT NULL,
  `expired_on` varchar(250) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `session` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `vehicles`;
CREATE TABLE `vehicles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_on` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted` tinyint(4) NOT NULL,
  `plate_number` varchar(50) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `name` varchar(250) NOT NULL,
  `color` varchar(250) NOT NULL,
  `type` varchar(250) NOT NULL,
  `photo` text NOT NULL,
  `stnk` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- 2023-02-02 01:42:23
