-- Adminer 4.8.1 MySQL 10.4.25-MariaDB dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` text NOT NULL,
  `rfid` varchar(250) NOT NULL,
  `deleted` tinyint(4) NOT NULL,
  `created_on` date NOT NULL,
  `modified_on` date NOT NULL,
  `role` varchar(250) NOT NULL,
  `photo` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user` (`id`, `user_name`, `email`, `password`, `rfid`, `deleted`, `created_on`, `modified_on`, `role`, `photo`) VALUES
(1,	'guest',	'email@mail.com',	'7110eda4d09e062aa5e4a390b0a572ac0d2c0220',	'269',	0,	'2022-11-22',	'0000-00-00',	'guest',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png'),
(2,	'Jack',	'mail@mail.com',	'b1b3773a05c0ed0176787a4f1574ff0075f7521e',	'227534',	0,	'2022-11-22',	'0000-00-00',	'super admin',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png'),
(3,	'marrie',	'marrie@mail.com',	'b1b3773a05c0ed0176787a4f1574ff0075f7521e',	'8065686',	0,	'2022-11-22',	'0000-00-00',	'admin',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png'),
(4,	'user',	'user@mail.com',	'b1b3773a05c0ed0176787a4f1574ff0075f7521e',	'8660902',	0,	'2022-11-22',	'0000-00-00',	'super admin',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png'),
(5,	'misdar',	'misdar@mail.com',	'356a192b7913b04c54574d18c28d46e6395428ab',	'3195788',	0,	'2022-11-26',	'0000-00-00',	'guest',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png'),
(7,	'misdar manto',	'misdar@itera.edu',	'b1b3773a05c0ed0176787a4f1574ff0075f7521e',	'4159172',	0,	'2022-11-26',	'0000-00-00',	'super admin',	'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png');

DROP TABLE IF EXISTS `user_sessions`;
CREATE TABLE `user_sessions` (
  `id` bigint(20) NOT NULL,
  `created_on` date NOT NULL,
  `modified_on` date NOT NULL,
  `deleted` tinyint(4) NOT NULL,
  `expired_on` varchar(250) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `session` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user_sessions` (`id`, `created_on`, `modified_on`, `deleted`, `expired_on`, `user_id`, `session`) VALUES
(0,	'2022-11-27',	'0000-00-00',	0,	'1669615595922',	4,	'995e8699-e2e0-451a-a536-968c3f3766d7'),
(0,	'2022-11-27',	'0000-00-00',	0,	'1669616341006',	7,	'71178c57-0bcf-4ed0-90dc-ec0e31af85ea');

DROP TABLE IF EXISTS `vehicle`;
CREATE TABLE `vehicle` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_on` date NOT NULL,
  `modified_on` date NOT NULL,
  `deleted` tinyint(4) NOT NULL,
  `plate_number` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `name` varchar(250) NOT NULL,
  `color` varchar(250) NOT NULL,
  `type` varchar(250) NOT NULL,
  `photo` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `vehicle_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `vehicle` (`id`, `created_on`, `modified_on`, `deleted`, `plate_number`, `user_id`, `name`, `color`, `type`, `photo`) VALUES
(8,	'2022-11-22',	'0000-00-00',	0,	1222,	1,	'lamborgini',	'red',	'car',	'https://m.atcdn.co.uk/vms/media/w980/a68575af72a34d108949947dd57d1a2a.jpg'),
(9,	'2022-11-22',	'0000-00-00',	0,	1222,	1,	'lamborgini',	'red',	'car',	'https://cdn.luxe.digital/media/20220127155206/fastest-cars-world-2022-luxe-digital-1-1200x600.jpg'),
(10,	'2022-11-22',	'0000-00-00',	0,	1222,	2,	'ferrari',	'red',	'car',	'https://blogger.googleusercontent.com/img/a/AVvXsEgwaa1iQAEjLT9bEsCN6lMFJVEjrbkFgzh4EtD_IETSnhl360O75DY2hN2T5oz2zvp1IyDaB2Rxn7Ml1RomMYWKue49ReF3RNOhXvDot36kov1MfBFHpBRCTPUpp0HTPXyXtP8YkRA9DnBZe--3eEt6o7mKsy-biybQWG7wff23KXR-8lg3mcuBOeK3ww=w1600'),
(11,	'2022-11-22',	'0000-00-00',	0,	1222,	2,	'tesla',	'red',	'car',	'https://www.autocar.co.uk/sites/autocar.co.uk/files/1-alpina-b7-2019-fd-hero-front.jpg');

-- 2022-11-28 04:15:45
