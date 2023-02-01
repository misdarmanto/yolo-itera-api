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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `photo`, `role`, `deleted`, `created_on`, `modified_on`) VALUES
(1,	'misdar',	'email@mail.com',	'7110eda4d09e062aa5e4a390b0a572ac0d2c0220',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	'admin',	0,	'2022-11-22 00:00:00',	'0000-00-00 00:00:00'),
(2,	'test',	'mail@mail.com',	'b1b3773a05c0ed0176787a4f1574ff0075f7521e',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	'super admin',	1,	'2022-11-22 00:00:00',	'2023-02-01 14:38:15'),
(8,	'Mac',	'mac@mail.com',	'b1b3773a05c0ed0176787a4f1574ff0075f7521e',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	'super admin',	1,	'2022-12-07 00:00:00',	'2023-02-01 14:39:15'),
(9,	'Tomi',	'tomi@mail.com',	'b1b3773a05c0ed0176787a4f1574ff0075f7521e',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	'admin',	1,	'2022-12-08 00:00:00',	'2023-02-01 14:40:01'),
(10,	'mimin',	'mimin@mail.com',	'b1b3773a05c0ed0176787a4f1574ff0075f7521e',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	'super admin',	0,	'2022-12-08 00:00:00',	'0000-00-00 00:00:00'),
(11,	'superadmin',	'superadmin@mail.com',	'b1b3773a05c0ed0176787a4f1574ff0075f7521e',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	'superAdmin',	0,	'2023-01-25 15:05:07',	NULL),
(12,	'user 1',	'user@mail.com',	'b1b3773a05c0ed0176787a4f1574ff0075f7521e',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	'superAdmin',	1,	'2023-02-01 14:54:06',	'2023-02-01 14:54:37'),
(13,	'user test sss',	'user@mail.com',	'b1b3773a05c0ed0176787a4f1574ff0075f7521e',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	'admin',	0,	'2023-02-01 14:54:06',	'2023-02-01 15:39:23')
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

INSERT INTO `traffic` (`id`, `vehicle_id`, `user_id`, `photo`, `check_in`, `check_out`, `created_on`, `modified_on`, `deleted`) VALUES
(8,	16,	10,	'https://m.atcdn.co.uk/vms/media/w980/a68575af72a34d108949947dd57d1a2a.jpg',	'Wed, 07 Dec 2022 10:30:23 GMT',	'Wed, 07 Dec 2022 10:31:04 GMT',	'2022-12-07',	'0000-00-00 00:00:00',	'0000-00-00 00:00:00'),
(9,	16,	10,	'https://m.atcdn.co.uk/vms/media/w980/a68575af72a34d108949947dd57d1a2a.jpg',	'Wed, 07 Dec 2022 10:31:13 GMT',	'Wed, 07 Dec 2022 10:31:26 GMT',	'2022-12-07',	'0000-00-00 00:00:00',	'0000-00-00 00:00:00'),
(10,	16,	10,	'https://m.atcdn.co.uk/vms/media/w980/a68575af72a34d108949947dd57d1a2a.jpg',	'Wed, 07 Dec 2022 10:59:38 GMT',	'Wed, 07 Dec 2022 10:59:58 GMT',	'2022-12-07',	'0000-00-00 00:00:00',	'0000-00-00 00:00:00'),
(11,	17,	9,	'https://m.atcdn.co.uk/vms/media/w980/a68575af72a34d108949947dd57d1a2a.jpg',	'Wed, 07 Dec 2022 15:19:22 GMT',	'waiting',	'2022-12-07',	'0000-00-00 00:00:00',	'0000-00-00 00:00:00')
ON DUPLICATE KEY UPDATE `id` = VALUES(`id`), `vehicle_id` = VALUES(`vehicle_id`), `user_id` = VALUES(`user_id`), `photo` = VALUES(`photo`), `check_in` = VALUES(`check_in`), `check_out` = VALUES(`check_out`), `created_on` = VALUES(`created_on`), `modified_on` = VALUES(`modified_on`), `deleted` = VALUES(`deleted`);

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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `email`, `phone`, `rfid`, `deleted`, `created_on`, `modified_on`, `name`, `register_as`, `photo`, `photo_identity`) VALUES
(1,	'email@mail.com',	0,	0,	1,	'2022-11-22 00:00:00',	'0000-00-00 00:00:00',	'Agus',	'pegawai',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	''),
(2,	'mail@mail.com',	0,	0,	1,	'2022-11-22 00:00:00',	'0000-00-00 00:00:00',	'Kate',	'pegawai',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	''),
(8,	'jack@mail.com',	12223333,	4528230,	0,	'2022-12-05 00:00:00',	'0000-00-00 00:00:00',	'jack',	'mahasiswa',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png'),
(9,	'mail@wwwmail.com',	81223422233,	8856012,	0,	'2022-12-05 00:00:00',	'0000-00-00 00:00:00',	'Marcle',	'mahasiswa',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png'),
(10,	'test@mail.com',	43434,	3379960,	0,	'2022-12-05 00:00:00',	'0000-00-00 00:00:00',	'guest dd',	'mahasiswa',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png'),
(17,	'tylor@mail.com',	920323232323,	7640227,	0,	'2022-12-08 00:00:00',	'0000-00-00 00:00:00',	'Tylor',	'pegawai',	'https://firebasestorage.googleapis.com/v0/b/project-itera.appspot.com/o/userImage%2Fhukum_aljabar_boolean.png?alt=media&token=ba77e752-a959-47f7-91ca-ad60af822e05',	'https://firebasestorage.googleapis.com/v0/b/project-itera.appspot.com/o/userIdentityImage%2FScreenshot%202022-12-07%20at%2012-30-54%20Boolean%20Algebra%20Solver%20-%20Boolean%20Expression%20Calculator.png?alt=media&token=c8d8c6f0-5255-4545-9a42-9231d9698a41'),
(18,	'JackMiller@mail.com',	823343322,	543762,	0,	'2023-02-01 12:58:53',	'2023-02-01 13:55:40',	'guest dd',	'mahasiswa',	'https://firebasestorage.googleapis.com/v0/b/project-itera.appspot.com/o/userImage%2Fvector2.png?alt=media&token=29254ccb-2b53-413d-a2c8-e95948969351',	'https://firebasestorage.googleapis.com/v0/b/project-itera.appspot.com/o/userImageIdentity%2Fvector.png?alt=media&token=e5a948df-7cdd-4b92-9082-fc039486bb1c')
ON DUPLICATE KEY UPDATE `id` = VALUES(`id`), `email` = VALUES(`email`), `phone` = VALUES(`phone`), `rfid` = VALUES(`rfid`), `deleted` = VALUES(`deleted`), `created_on` = VALUES(`created_on`), `modified_on` = VALUES(`modified_on`), `name` = VALUES(`name`), `register_as` = VALUES(`register_as`), `photo` = VALUES(`photo`), `photo_identity` = VALUES(`photo_identity`);

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

INSERT INTO `user_sessions` (`id`, `created_on`, `modified_on`, `deleted`, `expired_on`, `user_id`, `session`) VALUES
(1,	'2022-11-27 00:00:00',	'0000-00-00 00:00:00',	0,	'1669615595922',	4,	'995e8699-e2e0-451a-a536-968c3f3766d7'),
(2,	'2022-11-27 00:00:00',	'0000-00-00 00:00:00',	0,	'1669616341006',	7,	'71178c57-0bcf-4ed0-90dc-ec0e31af85ea')
ON DUPLICATE KEY UPDATE `id` = VALUES(`id`), `created_on` = VALUES(`created_on`), `modified_on` = VALUES(`modified_on`), `deleted` = VALUES(`deleted`), `expired_on` = VALUES(`expired_on`), `user_id` = VALUES(`user_id`), `session` = VALUES(`session`);

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

INSERT INTO `vehicles` (`id`, `created_on`, `modified_on`, `deleted`, `plate_number`, `user_id`, `name`, `color`, `type`, `photo`, `stnk`) VALUES
(12,	'2022-12-05 00:00:00',	'0000-00-00 00:00:00',	1,	'1212222',	10,	'kendaraan test',	'pink',	'Mobil',	'',	''),
(13,	'2022-12-06 00:00:00',	'0000-00-00 00:00:00',	1,	'32323232',	1,	'ssss',	'hitam',	'Mobil',	'https://pousses.fr/sites/default/files/2022-01/no-image.png',	'https://pousses.fr/sites/default/files/2022-01/no-image.png'),
(14,	'2022-12-06 00:00:00',	'2023-02-01 13:03:21',	1,	'2312',	1,	'pajero sport',	'putih',	'Mobil',	'https://pousses.fr/sites/default/files/2022-01/no-image.png',	'https://pousses.fr/sites/default/files/2022-01/no-image.png'),
(15,	'2022-12-06 00:00:00',	'0000-00-00 00:00:00',	1,	'33',	9,	'nisan',	'biru',	'Mobil',	'https://pousses.fr/sites/default/files/2022-01/no-image.png',	'https://pousses.fr/sites/default/files/2022-01/no-image.png'),
(16,	'2022-12-06 00:00:00',	'0000-00-00 00:00:00',	0,	'3434',	10,	'Beats',	'putih',	'Motor',	'https://pousses.fr/sites/default/files/2022-01/no-image.png',	'https://pousses.fr/sites/default/files/2022-01/no-image.png'),
(17,	'2022-12-07 00:00:00',	'2023-02-01 13:02:54',	1,	'WE 1242 FE',	9,	'Supra',	'Biru',	'Motor',	'https://pousses.fr/sites/default/files/2022-01/no-image.png',	'https://pousses.fr/sites/default/files/2022-01/no-image.png'),
(18,	'2022-12-08 00:00:00',	'0000-00-00 00:00:00',	0,	'd43434',	10,	'dssdfds',	'dsfdsf',	'Mobil',	'https://firebasestorage.googleapis.com/v0/b/project-itera.appspot.com/o/vehicleImage%2FGambar-Contoh-Soal-Aljabar-Boolean-6.gif?alt=media&token=052c543b-fe7d-4f0e-957e-6017d9ba6a8a',	'https://firebasestorage.googleapis.com/v0/b/project-itera.appspot.com/o/STNKImage%2FScreenshot%202022-12-07%20at%2012-32-45%20Boolean%20Algebra%20Solver%20-%20Boolean%20Expression%20Calculator.png?alt=media&token=b268c821-4ead-4e9d-ba43-b1a0e9d43d27'),
(19,	'2022-12-08 00:00:00',	'0000-00-00 00:00:00',	0,	'swe3',	10,	'bebek',	'gggg',	'Motor',	'https://pousses.fr/sites/default/files/2022-01/no-image.png',	'https://pousses.fr/sites/default/files/2022-01/no-image.png')
ON DUPLICATE KEY UPDATE `id` = VALUES(`id`), `created_on` = VALUES(`created_on`), `modified_on` = VALUES(`modified_on`), `deleted` = VALUES(`deleted`), `plate_number` = VALUES(`plate_number`), `user_id` = VALUES(`user_id`), `name` = VALUES(`name`), `color` = VALUES(`color`), `type` = VALUES(`type`), `photo` = VALUES(`photo`), `stnk` = VALUES(`stnk`);

-- 2023-02-01 15:47:24
