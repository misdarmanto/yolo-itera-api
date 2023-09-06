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
  `traffic_id` text NOT NULL,
  `traffic_user_name` varchar(100) DEFAULT NULL,
  `traffic_user_rfid_card` varchar(100) DEFAULT NULL,
  `traffic_vehicle_name` varchar(100) DEFAULT NULL,
  `traffic_vehicle_type` enum('motor','mobil') DEFAULT NULL,
  `traffic_vehicle_color` varchar(100) DEFAULT NULL,
  `traffic_vehicle_rfid` varchar(100) DEFAULT NULL,
  `traffic_vehicle_check_in` varchar(200) DEFAULT NULL,
  `traffic_vehicle_check_out` varchar(200) DEFAULT NULL,
  `traffic_vehicle_image` text DEFAULT NULL,
  `traffic_vehicle_plate_number` varchar(100) DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modified_on` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `traffic` (`id`, `traffic_id`, `traffic_user_name`, `traffic_user_rfid_card`, `traffic_vehicle_name`, `traffic_vehicle_type`, `traffic_vehicle_color`, `traffic_vehicle_rfid`, `traffic_vehicle_check_in`, `traffic_vehicle_check_out`, `traffic_vehicle_image`, `traffic_vehicle_plate_number`, `created_on`, `modified_on`, `deleted`) VALUES
(15,	'd1993b6a-c4a9-4442-bad1-5a595ae02f03',	NULL,	'',	NULL,	NULL,	NULL,	'',	'2023-09-07 05:46:01',	NULL,	'',	'',	'2023-09-06 22:46:01',	NULL,	'0000-00-00 00:00:00'),
(16,	'7af2f02f-6945-489f-a97e-a8655f29f20a',	NULL,	'',	NULL,	NULL,	NULL,	'',	'2023-09-07 05:48:49',	NULL,	'',	'',	'2023-09-06 22:48:49',	NULL,	'0000-00-00 00:00:00'),
(17,	'a009cbfb-2b6a-4378-b30b-efc363842b10',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2023-09-07 05:51:08',	NULL,	NULL,	NULL,	'2023-09-06 22:51:08',	NULL,	'0000-00-00 00:00:00'),
(18,	'99a270f2-1bd8-4804-90e4-2de65008cb84',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2023-09-07 06:06:48',	NULL,	NULL,	'ewrewr',	'2023-09-06 23:06:48',	NULL,	'0000-00-00 00:00:00'),
(19,	'8f6f281a-1462-4e20-bd4d-b466d8e12ce3',	'test',	'1691171311',	NULL,	NULL,	NULL,	'4234324',	'2023-09-07 06:14:55',	NULL,	NULL,	'ewrewr',	'2023-09-06 23:14:55',	NULL,	'0000-00-00 00:00:00');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` text NOT NULL,
  `user_email` varchar(250) NOT NULL,
  `user_phone_number` int(11) NOT NULL,
  `user_rfid_card` text NOT NULL,
  `deleted` tinyint(4) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_on` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `user_name` varchar(250) NOT NULL,
  `user_register_as` varchar(250) NOT NULL,
  `user_photo` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `user_id`, `user_email`, `user_phone_number`, `user_rfid_card`, `deleted`, `created_on`, `modified_on`, `user_name`, `user_register_as`, `user_photo`) VALUES
(24,	'555b9461-1047-4660-b379-51c8f3cf6385',	'test@mail.com',	834343243,	'1691171311',	0,	'2023-09-06 13:15:36',	NULL,	'test',	'pegawai',	'https://firebasestorage.googleapis.com/v0/b/project-itera.appspot.com/o/userImage%2Ffavicon.svg?alt=media&token=c0b5c8fa-06b2-4fb1-be6e-ca1853f11122');

DROP TABLE IF EXISTS `vehicles`;
CREATE TABLE `vehicles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `vehicle_id` text NOT NULL,
  `vehicle_plate_number` varchar(250) NOT NULL,
  `vehicle_type` enum('mobil','motor') NOT NULL DEFAULT 'motor',
  `vehicle_rfid` varchar(200) NOT NULL,
  `vehicle_user_id` text NOT NULL,
  `vehicle_name` varchar(200) NOT NULL,
  `vehicle_color` varchar(200) NOT NULL,
  `vehicle_photo` text NOT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` tinyint(4) NOT NULL,
  `modified_on` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `vehicles` (`id`, `vehicle_id`, `vehicle_plate_number`, `vehicle_type`, `vehicle_rfid`, `vehicle_user_id`, `vehicle_name`, `vehicle_color`, `vehicle_photo`, `created_on`, `deleted`, `modified_on`) VALUES
(1,	'36126cba-5e60-43ef-a359-1ec656a7720c',	'BE1234XZ',	'mobil',	'4234324',	'555b9461-1047-4660-b379-51c8f3cf6385',	'Nissan GT',	'hitam',	'https://firebasestorage.googleapis.com/v0/b/project-itera.appspot.com/o/vehicleImage%2Ffavicon.svg?alt=media&token=7eb70fc2-e3db-47b2-a9a7-31e3cda1de99',	'2023-09-06 13:15:36',	0,	NULL),
(2,	'c9da5197-5e37-4166-8c16-e5a615d8f9f1',	'BE1234XZ',	'mobil',	'4234324',	'555b9461-1047-4660-b379-51c8f3cf6385',	'Nissan GT',	'hitam',	'https://firebasestorage.googleapis.com/v0/b/project-itera.appspot.com/o/vehicleImage%2Ffavicon.svg?alt=media&token=cbf21fb5-0cbc-41d8-b361-b416f34e1301',	'2023-09-06 14:10:36',	0,	NULL);

-- 2023-09-06 16:16:23
