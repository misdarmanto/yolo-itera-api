-- Adminer 4.8.1 MySQL 5.5.5-10.6.12-MariaDB-0ubuntu0.22.04.1 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `admin_id` text NOT NULL,
  `admin_name` varchar(100) NOT NULL,
  `admin_email` varchar(100) NOT NULL,
  `admin_password` text NOT NULL,
  `admin_photo` varchar(250) NOT NULL,
  `admin_role` enum('admin','superAdmin') DEFAULT 'admin',
  `deleted` tinyint(4) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_on` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `admin` (`id`, `admin_id`, `admin_name`, `admin_email`, `admin_password`, `admin_photo`, `admin_role`, `deleted`, `created_on`, `modified_on`) VALUES
(17,	'46a8c2be-ecc2-438c-b9ce-3406523e15a0',	'super admin',	'superAdmin@mail.com',	'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a',	'http://photo.com',	'superAdmin',	0,	'2023-09-06 00:30:13',	NULL);

DROP TABLE IF EXISTS `traffic`;
CREATE TABLE `traffic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `traffic_vehicle_id` text NOT NULL,
  `traffic_user_id` text NOT NULL,
  `traffic_vehicle_image` text NOT NULL,
  `traffic_vehicle_check_in` varchar(200) NOT NULL,
  `traffic_vehicle_check_out` varchar(200) NOT NULL,
  `created_on` date NOT NULL,
  `modified_on` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` text NOT NULL,
  `user_email` varchar(250) NOT NULL,
  `user_phone_number` int(11) NOT NULL,
  `user_rfid_card` int(11) NOT NULL,
  `deleted` tinyint(4) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_on` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `user_name` varchar(250) NOT NULL,
  `user_register_as` varchar(250) NOT NULL,
  `user_photo` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `user_id`, `user_email`, `user_phone_number`, `user_rfid_card`, `deleted`, `created_on`, `modified_on`, `user_name`, `user_register_as`, `user_photo`) VALUES
(22,	'5b6cf457-8d52-4f63-9aac-eedf98269061',	'test@mail.com',	834343243,	1691171311,	0,	'2023-09-06 00:49:42',	NULL,	'test',	'pegawai',	'https://firebasestorage.googleapis.com/v0/b/project-itera.appspot.com/o/userImage%2Ffavicon.svg?alt=media&token=3f3e1f94-c4d5-4de9-aa11-a1919126fc68');

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
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- 2023-09-06 02:07:23
