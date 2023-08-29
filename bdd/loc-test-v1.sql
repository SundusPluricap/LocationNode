-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 28, 2023 at 07:25 AM
-- Server version: 8.0.31
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `loc-test-v1`
--

-- --------------------------------------------------------

--
-- Table structure for table `batiments`
--

DROP TABLE IF EXISTS `batiments`;
CREATE TABLE IF NOT EXISTS `batiments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `establishmentId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `establishmentId` (`establishmentId`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `batiments`
--

INSERT INTO `batiments` (`id`, `name`, `adresse`, `photo`, `createdAt`, `updatedAt`, `establishmentId`) VALUES
(2, 'sundus', 'here', NULL, '2023-07-26 14:07:25', '2023-07-26 14:07:25', 1),
(3, 'pluricap', '1 a d\'alsace', '1690380559847.png', '2023-07-26 14:09:19', '2023-07-26 14:29:00', 2),
(4, 'bat', '1 avenu', '1690381707052.png', '2023-07-26 14:18:23', '2023-07-26 14:28:27', 2),
(5, 'batiment', '114 rue de gare', '1691419322513.jpg', '2023-08-07 14:42:02', '2023-08-07 14:42:02', 1),
(6, 'BatiBati', '3 rue  de my heart', '1691505591058.png', '2023-08-08 14:39:51', '2023-08-08 14:39:51', 2),
(7, 'BatiBati', '3 rue  de my heart', '1691505803934.png', '2023-08-08 14:43:23', '2023-08-24 10:44:30', 3),
(18, 'test', '114 rue de gare', '1692189372447.jpg', '2023-08-16 12:36:12', '2023-08-16 12:36:12', 1);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phoneNumber` varchar(20) NOT NULL,
  `adresse` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `codePostal` varchar(225) NOT NULL,
  `country` varchar(225) NOT NULL DEFAULT 'France',
  `companyName` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` int DEFAULT NULL,
  `linkedTo` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `linkedTo` (`linkedTo`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `firstName`, `lastName`, `email`, `phoneNumber`, `adresse`, `codePostal`, `country`, `companyName`, `createdAt`, `updatedAt`, `createdBy`, `linkedTo`) VALUES
(108, 'hi', 'baby', 'ss@ss.ssd', '01847294', 'here', '', 'France', 'pl', '2023-08-23 09:30:34', '2023-08-23 09:59:13', 31, 18),
(111, 'try', 'me', 'ss@ss.ss', '09743674', 'ss', '', 'France', 'ss', '2023-08-23 12:49:07', '2023-08-23 12:49:07', 39, 59),
(112, 'joohn', 'doe', 'ss@ss.ss', '0782319800', '3 rue  de my heart', '', 'France', 'pl', '2023-08-23 12:56:55', '2023-08-23 12:56:55', 38, 34),
(114, 'test', 'user', 'ss@ss.ss', 'sssa5342', 'ss', '', 'France', 'ss', '2023-08-23 14:24:35', '2023-08-23 14:24:35', 59, 59),
(116, 'test delete', 'now', 'ss@ss.ss', '957', 'here', '', 'France', 'peda', '2023-08-24 07:28:27', '2023-08-24 07:28:27', 94, 18),
(117, 'to sundus', 'client', 'sundus.pluricap@gmail.com', '0782319800', '3 rue  de my heart', '', 'France', 'pl', '2023-08-24 07:29:22', '2023-08-24 07:29:22', 31, 18);

-- --------------------------------------------------------

--
-- Table structure for table `establishments`
--

DROP TABLE IF EXISTS `establishments`;
CREATE TABLE IF NOT EXISTS `establishments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `adresse` varchar(255) NOT NULL,
  `codePostal` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `SIRET` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `bankName` varchar(255) NOT NULL,
  `IBAN` varchar(255) NOT NULL,
  `BIC` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `establishments`
--

INSERT INTO `establishments` (`id`, `name`, `createdAt`, `updatedAt`, `adresse`, `codePostal`, `country`, `SIRET`, `bankName`, `IBAN`, `BIC`) VALUES
(1, 'Pedagogia', '2023-08-02 07:47:23', '2023-08-25 10:27:42', '114 rue de gare', '4533', 'JE SAIS PAS', '36GRV', 'sds', 'gg', 'ds'),
(2, 'Pluricap', '2023-07-26 08:18:39', '2023-08-25 10:27:11', '1 a d\'alsace ', '67000', 'France ', '32635257', ' BNP ', '3TZERT34', ' \"\'TG3v '),
(3, 'Gestlearn', '2023-08-03 14:50:13', '2023-08-25 10:26:05', '1 a d\'alsace', '67000', 'France', '32635257', 'BNP', '3TZERT34', '\"\'TG3v');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` enum('Room','product','batiment') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `product_id` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  `description` text,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_images_batiments` (`room_id`),
  KEY `fk_products_images` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `name`, `type`, `product_id`, `room_id`, `description`, `createdAt`, `updatedAt`) VALUES
(5, '1690534056899.png', 'Room', 20, NULL, NULL, '2023-07-28 08:47:36', '2023-08-25 07:26:44'),
(6, '1690534161776.png', 'Room', 21, NULL, NULL, '2023-07-28 08:49:21', '2023-08-25 07:26:50'),
(7, '1690534633476.png', 'Room', 22, NULL, NULL, '2023-07-28 08:57:13', '2023-08-25 07:26:56'),
(8, '1690534908513.png', 'Room', 23, NULL, NULL, '2023-07-28 09:01:48', '2023-08-25 07:27:02'),
(9, '1690535018046.png', 'Room', 24, NULL, NULL, '2023-07-28 09:03:38', '2023-08-25 07:27:09'),
(10, '1690535315750.png', 'Room', 25, NULL, NULL, '2023-07-28 09:08:35', '2023-08-25 07:27:19'),
(11, '1690536586521.jpg', 'Room', 26, NULL, NULL, '2023-07-28 09:29:46', '2023-08-25 07:27:25'),
(12, '1690536684354.png', 'Room', 27, NULL, NULL, '2023-07-28 09:31:24', '2023-08-25 07:27:30'),
(13, '1690537027386.png', 'Room', 28, NULL, NULL, '2023-07-28 09:37:07', '2023-08-25 07:27:36'),
(14, '1690538891844.png', 'Room', 29, NULL, NULL, '2023-07-28 10:08:11', '2023-08-25 07:27:41'),
(15, '1690539722504.png', 'Room', 29, NULL, NULL, '2023-07-28 10:22:02', '2023-08-25 07:27:48'),
(16, '1690539766061.png', 'Room', 29, NULL, NULL, '2023-07-28 10:22:46', '2023-08-25 07:27:54'),
(17, '1690540731955.png', 'Room', 28, NULL, NULL, '2023-07-28 10:38:51', '2023-08-25 07:27:58'),
(18, '1690562293894.png', 'Room', 30, NULL, NULL, '2023-07-28 16:38:13', '2023-08-25 07:28:03'),
(19, '1690562311196.png', 'Room', 30, NULL, NULL, '2023-07-28 16:38:31', '2023-08-25 07:28:08'),
(20, '1690798002023.png', 'Room', 30, NULL, NULL, '2023-07-31 10:06:42', '2023-08-25 07:28:12'),
(21, '1690798016875.png', 'Room', 30, NULL, NULL, '2023-07-31 10:06:56', '2023-08-25 07:28:16'),
(22, '1690807273990.png', 'Room', 25, NULL, NULL, '2023-07-31 12:41:14', '2023-08-25 07:28:20'),
(23, '1691504774260.jpg', 'Room', 31, NULL, NULL, '2023-08-08 14:26:14', '2023-08-25 07:28:26'),
(24, '1692182565324.jpg', 'Room', 32, NULL, NULL, '2023-08-16 10:42:45', '2023-08-25 07:28:31'),
(26, '1692197933245.jpg', 'Room', 34, NULL, NULL, '2023-08-16 14:58:53', '2023-08-25 07:28:35'),
(27, '1692197987688.jpg', 'Room', 35, NULL, NULL, '2023-08-16 14:59:47', '2023-08-25 07:28:39'),
(28, '1692875110124.jpg', 'Room', 19, NULL, NULL, '2023-08-24 11:05:10', '2023-08-25 07:28:43'),
(29, '1692875116301.jpg', 'Room', 19, NULL, NULL, '2023-08-24 11:05:16', '2023-08-25 07:28:47'),
(30, '1692875232894.jpg', 'Room', 36, NULL, NULL, '2023-08-24 11:07:12', '2023-08-25 07:28:52'),
(31, '1692949483443.jpg', 'Room', NULL, 19, NULL, '2023-08-25 07:44:43', '2023-08-25 07:59:01'),
(32, '1692949556671.jpg', 'Room', NULL, NULL, NULL, '2023-08-25 07:45:56', '2023-08-25 07:45:56'),
(33, '1692950469618.png', 'Room', 19, NULL, NULL, '2023-08-25 08:01:09', '2023-08-25 08:01:09'),
(34, '1692950484315.png', 'Room', 19, NULL, NULL, '2023-08-25 08:01:24', '2023-08-25 08:01:24'),
(35, '1692951405847.png', 'Room', NULL, 20, NULL, '2023-08-25 08:16:45', '2023-08-25 08:16:45'),
(36, '1692951443910.png', 'Room', NULL, NULL, NULL, '2023-08-25 08:17:23', '2023-08-25 08:17:23'),
(37, '1692951483987.png', 'Room', NULL, NULL, NULL, '2023-08-25 08:18:04', '2023-08-25 08:18:04'),
(38, '1692951495797.png', 'Room', NULL, NULL, NULL, '2023-08-25 08:18:15', '2023-08-25 08:18:15'),
(39, '1692952013500.png', 'Room', NULL, 14, NULL, '2023-08-25 08:26:53', '2023-08-25 08:26:53'),
(40, '1692959458122.png', 'Room', NULL, 1, NULL, '2023-08-25 10:30:58', '2023-08-25 10:30:58'),
(41, '1692959473296.jpg', 'Room', NULL, 1, NULL, '2023-08-25 10:31:13', '2023-08-25 10:31:13'),
(42, '1692959497998.png', 'Room', NULL, 15, NULL, '2023-08-25 10:31:38', '2023-08-25 10:31:38');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `object` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `createdAt`, `updatedAt`, `object`) VALUES
(1, 'edit User', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'user'),
(2, 'View User', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'user'),
(3, 'delete User', '2023-08-09 12:39:31', '2023-08-09 12:39:31', 'user'),
(4, 'edit Client', '2023-08-09 12:40:07', '2023-08-09 12:40:07', 'client'),
(5, 'view Client', '2023-08-09 12:40:07', '2023-08-09 12:40:07', 'client'),
(6, 'delete Client', '2023-08-09 12:40:07', '2023-08-09 12:40:07', 'client'),
(7, 'view establishment', '2023-08-09 12:40:07', '2023-08-09 12:40:07', 'establishment'),
(8, 'edit establishment', '2023-08-09 12:40:07', '2023-08-09 12:40:07', 'establishment'),
(9, 'delete establishment', '2023-08-09 12:40:07', '2023-08-09 12:40:07', 'establishment'),
(10, 'view Batiment', '2023-08-16 07:20:08', '2023-08-16 07:20:08', NULL),
(11, 'edit Batiment', '2023-08-16 07:20:08', '2023-08-16 07:20:08', NULL),
(12, 'delete Batiment', '2023-08-16 07:20:08', '2023-08-16 07:20:08', NULL),
(13, 'create Batiment', '2023-08-16 13:06:14', '2023-08-16 13:06:14', NULL),
(14, 'create Salle', '2023-08-16 13:07:46', '2023-08-16 13:07:46', ''),
(15, 'view Salle', '2023-08-16 13:07:46', '2023-08-16 13:07:46', NULL),
(16, 'edit Salle', '2023-08-16 13:07:46', '2023-08-16 13:07:46', NULL),
(17, 'delete Salle', '2023-08-16 13:07:46', '2023-08-16 13:07:46', NULL),
(18, 'reserve Salle', '2023-08-17 10:12:27', '2023-08-17 10:12:27', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `capacity` varchar(255) DEFAULT NULL,
  `price` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `batiment_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_batiments` (`batiment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `capacity`, `price`, `type`, `createdAt`, `updatedAt`, `batiment_id`) VALUES
(4, 'Sample Product', 'Sample Capacity', '120', 'Sample Type', '2023-07-27 07:35:17', '2023-07-27 07:35:17', 1),
(5, 'Sample Product', 'Sample Capacity', '120', 'Sample Type', '2023-07-27 07:35:59', '2023-07-27 07:35:59', 2),
(6, 'Sample Product', 'Sample Capacity', '120', 'Sample Type', '2023-07-27 07:36:55', '2023-07-27 07:36:55', 3),
(7, 'Sample Product 1', 'Sample Capacity 2', '120', 'Sample Type', '2023-07-27 07:58:12', '2023-07-27 07:58:13', 4),
(8, 'Sample Product 1', 'Sample Capacity 2', '120', 'Sample Type', '2023-07-27 07:58:19', '2023-07-27 07:58:19', 5),
(9, 'Sample Product 1', 'Sample Capacity 2', '120', 'Sample Type', '2023-07-27 07:58:28', '2023-07-27 07:58:28', 6),
(19, 'Salle creation edited', '34', '345', 'Salle', '2023-07-28 08:46:15', '2023-08-24 11:05:16', 2),
(20, 'Salle creation3', '3', '450', 'Salle', '2023-07-28 08:47:36', '2023-07-28 08:47:36', 1),
(21, 'Salle creation3', '3', '450', 'Salle', '2023-07-28 08:49:21', '2023-07-28 08:49:21', 2),
(22, 'Salle 1', '1', '350', 'Salle', '2023-07-28 08:57:13', '2023-07-28 08:57:13', 3),
(23, 'salle2', '1', '560', 'Salle', '2023-07-28 09:01:48', '2023-07-28 09:01:48', 4),
(24, '3', '3', '34', 'Salle', '2023-07-28 09:03:38', '2023-07-28 09:03:38', 5),
(25, 'Salle 4', '4', '445', 'Salle', '2023-07-28 09:08:35', '2023-07-31 12:41:14', 6),
(26, 'ss', '3', '', 'Salle', '2023-07-28 09:29:46', '2023-07-31 07:48:02', 7),
(27, '3', '3', '34', 'Salle', '2023-07-28 09:31:24', '2023-07-28 09:31:24', 2),
(28, 'Salle 1', '1', '350', 'Salle', '2023-07-28 09:37:07', '2023-07-28 10:38:51', 1),
(29, 'vv', '1', '360', 'Salle', '2023-07-28 10:08:11', '2023-07-28 10:22:46', 1),
(30, 'Salle 1', '8', '899', 'Salle', '2023-07-28 16:38:13', '2023-07-31 10:06:56', 7),
(31, 'zd', '1', '10.00', 'Salle', '2023-08-08 14:26:14', '2023-08-08 14:26:14', 4),
(32, 'test', '2', '20.00', 'Salle', '2023-08-16 10:42:45', '2023-08-16 10:42:45', 5),
(34, 'test', '1', '20.00', 'Salle', '2023-08-16 14:58:53', '2023-08-16 14:58:53', 18),
(35, 'test2', '2', '20.00', 'Salle', '2023-08-16 14:59:47', '2023-08-16 14:59:47', 2),
(36, 'try new', '500', '262', 'Salle', '2023-08-24 11:07:12', '2023-08-24 11:07:38', 2);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
CREATE TABLE IF NOT EXISTS `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `capacity` varchar(255) DEFAULT NULL,
  `price` varchar(255) NOT NULL,
  `TVA` varchar(225) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `batiment_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rooms_batiments` (`batiment_id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `capacity`, `price`, `TVA`, `createdAt`, `updatedAt`, `batiment_id`) VALUES
(1, 'Salle creation edited', '34', '345', NULL, '2023-07-28 06:46:15', '2023-08-25 10:31:13', 2),
(2, 'Salle creation3', '3', '450', NULL, '2023-07-28 06:47:36', '2023-07-28 06:47:36', 1),
(3, 'Salle creation3', '3', '450', NULL, '2023-07-28 06:49:21', '2023-07-28 06:49:21', 2),
(4, 'Salle 1', '1', '350', NULL, '2023-07-28 06:57:13', '2023-07-28 06:57:13', 3),
(5, 'salle2', '1', '560', NULL, '2023-07-28 07:01:48', '2023-07-28 07:01:48', 4),
(6, '3', '3', '34', NULL, '2023-07-28 07:03:38', '2023-07-28 07:03:38', 5),
(7, 'Salle 4', '4', '445', NULL, '2023-07-28 07:08:35', '2023-07-31 10:41:14', 6),
(8, 'ss', '3', '', NULL, '2023-07-28 07:29:46', '2023-07-31 05:48:02', 7),
(9, '3', '3', '34', NULL, '2023-07-28 07:31:24', '2023-07-28 07:31:24', 2),
(10, 'Salle 1', '1', '350', NULL, '2023-07-28 07:37:07', '2023-07-28 08:38:51', 1),
(11, 'vv', '1', '360', NULL, '2023-07-28 08:08:11', '2023-07-28 08:22:46', 1),
(12, 'Salle 1', '8', '899', NULL, '2023-07-28 14:38:13', '2023-07-31 08:06:56', 7),
(13, 'zd', '1', '10.00', NULL, '2023-08-08 12:26:14', '2023-08-08 12:26:14', 4),
(14, 'test', '2', '20.00', NULL, '2023-08-16 08:42:45', '2023-08-25 08:26:53', 2),
(15, 'test', '1', '20.00', NULL, '2023-08-16 12:58:53', '2023-08-25 10:31:38', 18),
(16, 'test2', '2', '20.00', NULL, '2023-08-16 12:59:47', '2023-08-16 12:59:47', 2),
(17, 'try new', '500', '262', NULL, '2023-08-24 09:07:12', '2023-08-24 09:07:38', 2),
(18, 'test 25/08 9:41', '2', '13584', NULL, '2023-08-25 07:44:43', '2023-08-25 07:44:43', 2),
(19, '08/25 9:45', '2', '3', NULL, '2023-08-25 07:45:56', '2023-08-25 08:18:15', 2),
(20, '08/25 10:16', '4', '7', NULL, '2023-08-25 08:16:45', '2023-08-25 08:29:38', 18);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `establishmentId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_establishments` (`establishmentId`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `role`, `createdAt`, `updatedAt`, `establishmentId`) VALUES
(18, 'Lea', 'Buchinger', 'leab@lea.lea', '$2b$10$gek1fCDRupHnC1P.sauApusEfLXHVtrcwq9sgSOa1KwHFXmu6y3xO', 'superAdmin', '2023-07-20 10:02:38', '2023-08-09 07:25:18', 1),
(31, 'Sundus ', 'Super', 'sundus.pluricap@gmail.com', '$2b$10$1Sc.0Dt.umoyxxUopD1D5.H8jfKFxsWdp4kfzUsvXgF32EmwVJn3a', 'superAdmin', '2023-07-26 08:20:00', '2023-08-03 13:59:36', 1),
(32, 'ja', 'dodo', 'Alan@dodo.cc', '$2b$10$Eh1TQ62AxxG/kkCeJmen..rdmczgB4eAMnd4I4sgag08c5tGVvc.q', 'admin', '2023-08-02 08:06:33', '2023-08-02 08:06:33', 2),
(34, 'Super', 'Admin', 'super.admin@gmail.com', '$2b$10$IEiObjdvZjHqlpatDRjdoeF0zJf82bXMoQvntb5tOGEIpwkNJSFxa', 'superAdmin', '2023-08-02 08:23:38', '2023-08-02 08:41:26', 2),
(38, 'Sundus ', 'Queen', 'sundus.pluricap@gmail.com', '$2b$10$CKHjMM06NU/iaYQ6aToU4O8/hMIooFIrvoJoun2wTp5xm0CW/XlQm', 'kingAdmin', '2023-08-03 10:07:49', '2023-08-03 14:36:31', 2),
(39, 'sundus', 'admin', 'sundus.pluricap@gmail.com', '$2b$10$I4nNp5JsPXztEglCMzNg4Od09plU4OdKnmg0jgA0DYYwFYJ1yzaRm', 'admin', '2023-08-03 13:38:32', '2023-08-03 13:39:36', 3),
(40, 'test', 'admin', 'test@email.com', '$2b$10$u8a/VfI9vRHJZsCHIr7yH./cQMJCZOKgotiTBA.wChViTC4nPiDw2', 'admin', '2023-08-03 13:52:45', '2023-08-03 13:52:45', 3),
(41, 'unit test', 'unit test', 'unit test', '$2b$10$0nrr/DssuP/JHeWOYZSKReQ1s/uHhMYdpXZq1k29VdGYuoA3Yvgyu', 'admin', '2023-08-03 14:31:39', '2023-08-21 14:45:42', 1),
(42, 'jane', 'd', 'try@email.com', '$2b$10$Cm.CaYK1WzsIVjf5Bw/I8OfwuwRUyxG8mZkkL950nuO1a4RVj/l6y', 'editor', '2023-08-03 14:33:23', '2023-08-03 14:33:23', 1),
(43, 'test', 'admin', 'testme@email.com', '$2b$10$sKljUoECWvE4l29M1d.hC.qD2nVBorJKErrBjPTAJ5Kq71XDWZOJ2', 'editor', '2023-08-03 14:34:16', '2023-08-03 14:34:16', 1),
(44, 'ss', 'ss', 'ss@ss.ss', '$2b$10$ct3s4AnFu7/Nu4bkDv6zsu.4gOrYvt4blm5.sjp5xpKhgxaiZUVni', 'editor', '2023-08-03 14:35:12', '2023-08-03 14:35:12', 2),
(46, 'sundus', 'alkebsi', 'sundus@gmail.com', '$2b$10$MM4N6gJ.vAIoMo0C3rrLjOiU7QSMbdb7O/MsF68IlgVCr0mRgMJ4y', 'editor', '2023-08-03 14:53:33', '2023-08-03 14:53:33', 2),
(47, 'test', 'admin', 'test@email.com', '$2b$10$/ePfwIsy7gK2q7Nxj6YdIOJVJHGvd3YDSykOtzl9NrQRGZbmCu0eS', 'admin', '2023-08-04 08:38:06', '2023-08-04 08:38:06', 1),
(49, 'jj', 'd', 'alan@h.frdd', '$2b$10$rKmEcXrNR/KAt2SZRz1GsOJ6Qqo/UkR5nLMRW4Eo6wt/6pG6b.Gdy', 'admin', '2023-08-09 13:56:29', '2023-08-09 13:56:29', 1),
(50, 'sunduss', 'ef', 'efzfe@e.ef', '$2b$10$kdmsDEY9Seq2bWTmwhWCq.Jt56p0YfmyMoT6ZIvv4cP6xl77VZn.e', 'admin', '2023-08-09 14:00:08', '2023-08-09 14:00:08', 1),
(51, 'sunduss', 'ef', 'efzfe@e.efz', '$2b$10$W86e5vuWfAQnUbTUkHxIS.lblGCyAL4CcDITwoz2IUL2/X6tzI.0y', 'admin', '2023-08-09 14:01:48', '2023-08-09 14:01:48', 1),
(52, 'unit test', 'unit test', 'unit test', '$2b$10$LN0KB.10MbMwuL1U25DaXOwNyOF.yVA2zZGVcmN8OqzetS6pa5mry', 'admin', '2023-08-09 14:56:30', '2023-08-21 15:06:12', 1),
(57, 'unit test', 'unit test', 'unit test', '$2b$10$egMuuz1HDR8E9kLJe3d.ueHxYCLWTNZ4uxR/F5aB.OR2q/MTYPm.2', 'unit test', '2023-08-21 13:20:55', '2023-08-21 13:20:55', 1),
(58, 'unit test', 'unit test', 'unit test', '$2b$10$ejMM7mCgDKInvPxDDwoLV.ah/5eQ3v0FBqDH3b02YMUFQ/UMxdoK2', 'unit test', '2023-08-21 13:25:37', '2023-08-21 13:25:37', 1),
(59, 'super', 'super admin', 'test@gmail.com', '$2b$10$nnZCu5sXLdZYRp6I3B6C3eksqVprmSgLkuIonnuDMTQzVUXAYuHM2', 'superAdmin', '2023-08-21 13:25:37', '2023-08-23 14:25:38', 3),
(60, 'unit test', 'unit test', 'unit test', '$2b$10$1FdcSxeJrfQwdCQoE9NJg.Tnx6.VSgIvggCzb2jFNwwTID4EwN3cK', 'unit test', '2023-08-21 13:31:52', '2023-08-21 13:31:52', 1),
(66, 'unit test', 'unit test', 'unit test', '$2b$10$XpdrNdoZOHmCurf1oOQOk.Zx1yw5D2HX4uU44vfrWPLVpDeUHjGBS', 'unit test', '2023-08-21 13:54:37', '2023-08-21 13:54:37', 1),
(69, 'unit test', 'unit test', 'unit test', '$2b$10$qFYppiqhQ8tVT0JElwkX8eUGoX1L0Llkj9ylKNebgvv0iL98OzYiG', 'unit test', '2023-08-21 13:55:23', '2023-08-21 13:55:23', 3),
(70, 'unit test', 'unit test', 'unit test', '$2b$10$wjMXuJmire4D9.Lpz4YAB.iGRtiGegpT5DXzwLAS/JvKdtsTh5Cwa', 'unit test', '2023-08-21 13:58:49', '2023-08-21 13:58:49', 1),
(71, 'unit test', 'unit test', 'unit test', '$2b$10$8XJ3M03PGemGKMZ04ONhPevSCWhjP271.7paZaOM/jBZepEIpe6LW', 'unit test', '2023-08-21 13:58:49', '2023-08-21 13:58:49', 3),
(72, 'unit test', 'unit test', 'unit test', '$2b$10$xyhh4fmkP9gEubJzAexHfuzBIrQqsI3dfdIG2pooPdjp4nXx1vgKm', 'unit test', '2023-08-21 14:08:08', '2023-08-21 14:08:08', 1),
(73, 'unit test', 'unit test', 'unit test', '$2b$10$hKqN8gDACYTRpoWLNQV6xeIj9gYly0abvm7kAJO6DRSUCqyDF8w1i', 'unit test', '2023-08-21 14:08:08', '2023-08-21 14:08:08', 3),
(74, 'unit test', 'unit test', 'unit test', '$2b$10$ceAJp5chPCuv3AnNiyU5FuTr/88hIEvYqEawsNX5isv7F5brkajry', 'unit test', '2023-08-21 14:08:39', '2023-08-21 14:08:39', 1),
(75, 'unit test', 'unit test', 'unit test', '$2b$10$eRDaXhEW3zjl5ROJEECk..8Y2P4d9QaH3lNAnBDyA9mppABFuN4iC', 'unit test', '2023-08-21 14:08:39', '2023-08-21 14:08:39', 3),
(76, 'unit test', 'unit test', 'unit test', '$2b$10$f6OsYNutaTZReML5hxPwZunoh9n4qgu6PT0zQWuuSkrS6t8Gkdu8i', 'unit test', '2023-08-21 14:15:12', '2023-08-21 14:15:12', 1),
(77, 'unit test', 'unit test', 'unit test', '$2b$10$JVZ4PSX.IvS.uPo7Pl1h.OowDz8DVbLGp5cPiNxzE1cgvVA2VjXOa', 'unit test', '2023-08-21 14:15:12', '2023-08-21 14:15:12', 3),
(78, 'unit test', 'unit test', 'unit test', '$2b$10$b7Be0AV.tAauwufGIC99e.a0gnTkM8DcGZH/Nq8DFaersXQ8jZXNO', 'unit test', '2023-08-21 14:25:34', '2023-08-21 14:25:34', 1),
(79, 'unit test', 'unit test', 'unit test', '$2b$10$2xiAJ3LXVS8/2.KrrcG94ep23KwIsWK46tHUuSPSUHMUCIFtWhFcu', 'unit test', '2023-08-21 14:25:34', '2023-08-21 14:25:34', 3),
(80, 'unit test', 'unit test', 'unit test', '$2b$10$KHZ/SGYeXtYor4ou.LeNHehkbMGZ23FEhyDhDzQdvBhvhLsZJwh5S', 'unit test', '2023-08-21 14:27:23', '2023-08-21 14:27:23', 1),
(81, 'unit test', 'unit test', 'unit test', '$2b$10$.F6omLY3Tbt1qpTryOVOWOLgVGKivg5dkV7djn0eQilne6BiguP4O', 'unit test', '2023-08-21 14:27:23', '2023-08-21 14:27:23', 3),
(82, 'unit test', 'unit test', 'unit test', '$2b$10$4iM.dx7LMEC0L2BF8zjwnOLDH4fXWaSmOuo3k.I30hp5BBQkzqBEe', 'unit test', '2023-08-21 14:27:43', '2023-08-21 14:27:43', 1),
(83, 'unit test', 'unit test', 'unit test', '$2b$10$blrmvumnaIU/l0g0E/8Hf.xqSDWsSi97zP9BzLZeT/Vr2rnnAkKvK', 'unit test', '2023-08-21 14:27:43', '2023-08-21 14:27:43', 3),
(84, 'unit test', 'unit test', 'unit test', '$2b$10$VJhThLRX2H8OgnyqMW9/V.azvjLt6udT8OaZc2JSDYVj9ajAOQLX6', 'unit test', '2023-08-21 14:31:36', '2023-08-21 14:31:36', 1),
(85, 'unit test', 'unit test', 'unit test', '$2b$10$lE/.mt8fViTEoYO8stCmReR4lyYPZ4uwIXcJwvdcpYuF8J95VtosC', 'unit test', '2023-08-21 14:31:36', '2023-08-21 14:31:36', 3),
(86, 'unit test', 'unit test', 'unit test', '$2b$10$fLYVCKn.jRPnirY24uKBHulWWkATGRDfMrCAKbtxbo2kVqiKkrCGC', 'unit test', '2023-08-21 14:34:31', '2023-08-21 14:34:31', 1),
(87, 'unit test', 'unit test', 'unit test', '$2b$10$Wl0YFTGPr9keOeKjRfmZ/uS2M0qQJ.9pVIEmcSYCsKp6vJZNrLWFG', 'unit test', '2023-08-21 14:34:31', '2023-08-21 14:34:31', 3),
(88, 'unit test', 'unit test', 'unit test', '$2b$10$gzddCxrpEUL0j0zDMJeW9.Bz1bCjms7q2ttGxh5UZ7cwUwZR68jma', 'unit test', '2023-08-21 14:37:30', '2023-08-21 14:37:30', 1),
(89, 'unit test', 'unit test', 'unit test', '$2b$10$rADRB261Php..7BKeTdejOfyZMYdFvUM32FDKNkQ7iLhyaq5bgnYW', 'unit test', '2023-08-21 14:37:31', '2023-08-21 14:37:31', 3),
(90, 'unit test', 'unit test', 'unit test', '$2b$10$m8R/Eg/yLXy8uU1wNJDvcehARDXiTyk08wdfUAYu/IDeOyAic6LmG', 'unit test', '2023-08-21 14:40:26', '2023-08-21 14:40:26', 1),
(91, 'unit test', 'unit test', 'unit test', '$2b$10$6AEsNad.wqnU54E7Sz3aEugtPSe8WIZT8WcUknkKs3kkXryhJGNt6', 'unit test', '2023-08-21 14:40:26', '2023-08-21 14:40:26', 3),
(93, 'unit test', 'unit test', 'unit test', '$2b$10$MKZLWmK36zB8HIby.2Uht.yqqTbkrJb/.ahRWU5jQYPCwxy53efHS', 'unit test', '2023-08-21 14:41:11', '2023-08-21 14:41:11', 3),
(94, 'unit test', 'unit test', 'unit test', '$2b$10$DS0Mz/GRnYhwgxYLO7hLLer1n5wrJ.WBUeynAWkU9q2sOegcG6Y82', 'unit test', '2023-08-21 14:45:42', '2023-08-21 14:45:42', 1),
(95, 'unit test', 'unit test', 'unit test', '$2b$10$Brss/OYetGiAkNK9712ANeYXuF3yV6lJJ0eHc2bvF96YhqWR..7M6', 'unit test', '2023-08-21 14:45:42', '2023-08-21 14:45:42', 3),
(96, 'unit test', 'unit test', 'unit test', '$2b$10$PuLFX7cAtDCpo/6lSQmNROzPJ/8tn.OC4h89PbKm91M2yYNpegOHu', 'unit test', '2023-08-21 14:51:51', '2023-08-21 14:51:51', 1),
(97, 'unit test', 'unit test', 'unit test', '$2b$10$TcO/sK30FwilsI9GCDFVluOXJJmN1H80r.neVjzxyy80BWfmyLOci', 'unit test', '2023-08-21 14:51:52', '2023-08-21 14:51:52', 3),
(98, 'unit test', 'unit test', 'unit test', '$2b$10$gy984eCCVSLJEWt0ng9iVubSmlSJqBHaqzvGWpFOBkN62dd0yuQPm', 'unit test', '2023-08-21 14:53:51', '2023-08-21 14:53:51', 1),
(99, 'unit test', 'unit test', 'unit test', '$2b$10$QlpE21rKA.tGQDQQnrsHT.swKUBMIAazT51z7WrNY2188lLICcrJy', 'unit test', '2023-08-21 14:53:51', '2023-08-21 14:53:51', 3),
(100, 'unit test', 'unit test', 'unit test', '$2b$10$IWsHG5fMTJ4fvbRpArQd6eb7dDHb/CnfYB6oQ57D5fRH52t8r0Z8W', 'unit test', '2023-08-21 14:55:30', '2023-08-21 14:55:30', 1),
(101, 'unit test', 'unit test', 'unit test', '$2b$10$4Weu2Xd0.uoD5tvjQkqJUeU/0YH0MFNLiuwYVMzOL28UUKA0Jep9u', 'unit test', '2023-08-21 14:55:30', '2023-08-21 14:55:30', 3),
(102, 'unit test', 'unit test', 'unit test', '$2b$10$GUplycR9xXAeIdgpD7erpuBiV.gFm3erEDZrzj8VekesknFN3Pbhu', 'unit test', '2023-08-21 14:56:20', '2023-08-21 14:56:20', 1),
(103, 'unit test', 'unit test', 'unit test', '$2b$10$P6c3tYe1lV.9Mwdl/eYUgefdpXPVio4yQimf2RR5y4KgdzZRFvSVy', 'unit test', '2023-08-21 14:56:20', '2023-08-21 14:56:20', 3),
(104, 'unit test', 'unit test', 'unit test', '$2b$10$STSI6E3LrZaIUljcWy33l.GwD0skanHNkCkcayXTGS9iwiEkcnP4O', 'unit test', '2023-08-21 14:58:15', '2023-08-21 14:58:15', 1),
(105, 'unit test', 'unit test', 'unit test', '$2b$10$ne85.bZXJ7Hl/H1/Djzj8O5wsuIeO5whjRzGRYW1/kHpPo60zZ8ES', 'unit test', '2023-08-21 14:58:15', '2023-08-21 14:58:15', 3),
(106, 'unit test', 'unit test', 'unit test', '$2b$10$IcmXtlpdWTMCv9lgNs7gmeu23D6WI0QI9S2Mz68mYsO3C1eFMZ8V.', 'unit test', '2023-08-21 14:59:54', '2023-08-21 14:59:54', 1),
(107, 'unit test', 'unit test', 'unit test', '$2b$10$xljlg68TVmOh3dqHTCVX2.QPdJ7gGRu/.obCHyQ7BUCPCS8wA2Fyy', 'unit test', '2023-08-21 14:59:54', '2023-08-21 14:59:54', 3),
(108, 'unit test', 'unit test', 'unit test', '$2b$10$FaT.SDoBaDK0/Q8JGoKVH.Bb1dPDzbNYzB2pwF9l6trkwPGvyBXf6', 'admin', '2023-08-21 15:01:25', '2023-08-21 15:01:25', 1),
(109, 'unit test', 'unit test', 'unit test', '$2b$10$IGPHRqCcnUqWNzUU.ik10eaG07cB/xylkIsz78uqbnwCkCPbgBz3C', 'unit test', '2023-08-21 15:01:25', '2023-08-21 15:01:25', 3),
(110, 'unit test', 'unit test', 'unit test', '$2b$10$lk4WU5vVt5G2sS.VQT.pkeZS043QO/XQHAMnpngzQ1MchIqdUXX3.', 'admin', '2023-08-21 15:02:51', '2023-08-21 15:02:51', 1),
(111, 'unit test', 'unit test', 'unit test', '$2b$10$qoKS/B.FmHZCBZoAhocnJuCRddn.lw76NMgprf6/Nq47lEvlb5u8a', 'unit test', '2023-08-21 15:02:51', '2023-08-21 15:02:51', 3),
(112, 'unit test', 'unit test', 'unit test', '$2b$10$OLSitpqO6fn5vi68nslbk.hJvJvMQOup/bTj7PVr5x/bt764DnuEa', 'admin', '2023-08-21 15:05:24', '2023-08-21 15:05:24', 1),
(113, 'unit test', 'unit test', 'unit test', '$2b$10$45QmQFmmndW6CrZ.AgXGs.OAHOGaFx0HoWgu5Ng8Eb1w3ziZ9qFne', 'admin', '2023-08-21 15:05:25', '2023-08-21 15:05:25', 3),
(114, 'unit test', 'unit test', 'unit test', '$2b$10$R5c16JS2WsVsa4Tyd9BvUub.O.I1WjXziNUy4lMCqUDy4UHMDdXme', 'admin', '2023-08-21 15:06:12', '2023-08-21 15:06:12', 1),
(115, 'unit test', 'unit test', 'unit test', '$2b$10$mRSg5Xw8mXP7m1UJQlEPTOazJbm1od4sHVcrzvwg5AT54r5p75gay', 'admin', '2023-08-21 15:06:12', '2023-08-21 15:06:12', 3),
(116, 'unit test', 'unit test', 'unit test', '$2b$10$GlYUJk/UjL9ASmOdL/AUuO1YkxMLWHOLIA.1gI/aqJgiX3zl91yhG', 'admin', '2023-08-21 15:07:36', '2023-08-21 15:07:36', 1),
(117, 'unit test', 'unit test', 'unit test', '$2b$10$/G54abgJs3Sag2HG8QPnZOtXgDQ0IzOythGR5I8o5XdqKNidnCakO', 'admin', '2023-08-21 15:07:36', '2023-08-21 15:07:36', 3),
(118, 'unit test', 'unit test', 'unit test', '$2b$10$BQopNhKrykiBS7XvtLhl.uNxf2gX6yz6Xm7gwvAIX1IUWg79Tp/Nq', 'admin', '2023-08-21 15:08:58', '2023-08-21 15:08:58', 1),
(119, 'unit test', 'unit test', 'unit test', '$2b$10$b8XE0mCgJW0Xy1gTo3tc.etVygHHnoXtIuq8tZlNoot2q0VrN6OMK', 'admin', '2023-08-21 15:08:58', '2023-08-21 15:08:58', 3),
(120, 'unit test', 'unit test', 'unit test', '$2b$10$ZY.3TLBS2qmd9HunCNXPk.OtwL6geTxCHDuHKvyUnWLNLqcMGwmVS', 'admin', '2023-08-21 15:10:45', '2023-08-21 15:10:45', 1),
(121, 'unit test', 'unit test', 'unit test', '$2b$10$Fs9794xZKBCOdl.rI5tmC.pAvBeQ/SDGX71WLy.kR8vcd7vKUCN4i', 'admin', '2023-08-21 15:10:45', '2023-08-21 15:10:45', 3),
(122, 'unit test', 'unit test', 'unit test', '$2b$10$fCIQ/G7LoL0hAjzKiBgb0uaX8VyzOVWIXEpKN9xEWKDrrl/gvE3ce', 'admin', '2023-08-21 15:11:42', '2023-08-21 15:11:42', 1),
(123, 'unit test', 'unit test', 'unit test', '$2b$10$XCK/IuxuZjvNJz6uKtHoTeVzJ2SnUjNH/biJLoxCufDQCnElyDWq.', 'admin', '2023-08-21 15:11:42', '2023-08-21 15:11:42', 3),
(125, 'unit test', 'unit test', 'unit test', '$2b$10$Dp4nMDfJedffokz361W6h.5DY45BvIazPrgNpyK1IDLIs1QZ5e1KO', 'admin', '2023-08-21 15:13:12', '2023-08-21 15:13:12', 3),
(126, 'unit test', 'unit test', 'unit test', '$2b$10$TS3A10QPOqHoh6hr52U7PukPCfUfNbEDA6aQXAVa7Q406L2sHOoKq', 'admin', '2023-08-21 15:18:15', '2023-08-21 15:18:15', 1),
(127, 'unit test', 'unit test', 'unit test', '$2b$10$0QyFsN7ajycG0kqogTsXNOJk39kuS.ZtfK6fgl8OnVF9VCa7PfUGS', 'admin', '2023-08-21 15:18:15', '2023-08-21 15:18:15', 3),
(128, 'unit test', 'unit test', 'unit test', '$2b$10$VC02pMFOfzRtQuKg6W/iu.GrgrITEoUnPq5.fwKOXCUmv8fl.K.yq', 'admin', '2023-08-21 15:18:32', '2023-08-21 15:18:32', 1),
(129, 'unit test', 'unit test', 'unit test', '$2b$10$nehtFvPxamtTtrsdr9c.wuHs5YTVHZ6T5YmdmX8IWG./8TVjJD.Sq', 'admin', '2023-08-21 15:18:32', '2023-08-21 15:18:32', 3),
(130, 'unit test', 'unit test', 'unit test', '$2b$10$t7e3O/bXAND9xPuG3g4UvOt..1klRODPj/ADTXCsejOkNqn32.W.q', 'admin', '2023-08-21 15:19:04', '2023-08-21 15:19:04', 1),
(131, 'unit test', 'unit test', 'unit test', '$2b$10$I4y8KihXtco0VMvX1mwlQ.Rc963f.4llUx8BFL5/ulaC0IgBSOlKS', 'admin', '2023-08-21 15:19:04', '2023-08-21 15:19:04', 3),
(132, 'unit test', 'unit test', 'unit test', '$2b$10$NXWumGchF8ktsRpewv9/ZOWauG/Hj.7Hri.p8bILOERL8tetu8oC2', 'admin', '2023-08-22 07:46:58', '2023-08-22 07:46:58', 1),
(133, 'unit test', 'unit test', 'unit test', '$2b$10$WVhGN1UwLs7iBrLOM.WJLOuIMNUs.FOjTjodEuYdhKancQj0GUGxK', 'admin', '2023-08-22 07:46:58', '2023-08-22 07:46:58', 3);

-- --------------------------------------------------------

--
-- Table structure for table `user_has_permission`
--

DROP TABLE IF EXISTS `user_has_permission`;
CREATE TABLE IF NOT EXISTS `user_has_permission` (
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`user_id`,`permission_id`),
  KEY `permission_id` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_has_permission`
--

INSERT INTO `user_has_permission` (`user_id`, `permission_id`, `createdAt`, `updatedAt`) VALUES
(18, 1, '2023-08-25 10:37:52', '2023-08-25 10:37:52'),
(18, 2, '2023-08-25 10:37:52', '2023-08-25 10:37:52'),
(18, 3, '2023-08-25 10:37:52', '2023-08-25 10:37:52'),
(18, 6, '2023-08-25 10:55:33', '2023-08-25 10:55:33'),
(31, 1, '2023-08-25 10:37:52', '2023-08-25 10:37:52'),
(31, 2, '2023-08-25 10:37:52', '2023-08-25 10:37:52'),
(31, 3, '2023-08-25 10:37:52', '2023-08-25 10:37:52'),
(31, 6, '2023-08-25 10:55:33', '2023-08-25 10:55:33'),
(32, 1, '2023-08-10 14:57:48', '2023-08-10 14:57:48'),
(32, 2, '2023-08-10 14:57:48', '2023-08-10 14:57:48'),
(32, 4, '2023-08-10 14:57:48', '2023-08-10 14:57:48'),
(32, 7, '2023-08-10 14:57:48', '2023-08-10 14:57:48'),
(32, 8, '2023-08-10 14:57:48', '2023-08-10 14:57:48'),
(34, 1, '2023-08-10 08:19:09', '2023-08-10 08:19:09'),
(34, 2, '2023-08-10 08:19:09', '2023-08-10 08:19:09'),
(34, 3, '2023-08-10 14:58:03', '2023-08-10 14:58:03'),
(34, 4, '2023-08-10 14:58:03', '2023-08-10 14:58:03'),
(34, 6, '2023-08-10 14:58:03', '2023-08-10 14:58:03'),
(34, 8, '2023-08-10 14:58:03', '2023-08-10 14:58:03'),
(34, 9, '2023-08-10 14:58:03', '2023-08-10 14:58:03'),
(38, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(38, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(38, 3, '2023-08-11 07:52:26', '2023-08-11 07:52:26'),
(38, 4, '2023-08-11 07:52:26', '2023-08-11 07:52:26'),
(38, 5, '2023-08-11 07:52:26', '2023-08-11 07:52:26'),
(38, 6, '2023-08-11 07:52:26', '2023-08-11 07:52:26'),
(38, 7, '2023-08-11 07:52:26', '2023-08-11 07:52:26'),
(38, 8, '2023-08-11 07:52:26', '2023-08-11 07:52:26'),
(38, 9, '2023-08-11 07:52:26', '2023-08-11 07:52:26'),
(38, 10, '2023-08-16 12:50:36', '2023-08-16 12:50:36'),
(38, 11, '2023-08-16 12:50:36', '2023-08-16 12:50:36'),
(38, 12, '2023-08-16 12:50:36', '2023-08-16 12:50:36'),
(38, 13, '2023-08-16 13:06:44', '2023-08-16 13:06:44'),
(38, 14, '2023-08-18 07:43:07', '2023-08-18 07:43:07'),
(38, 15, '2023-08-18 07:43:07', '2023-08-18 07:43:07'),
(38, 16, '2023-08-18 07:43:07', '2023-08-18 07:43:07'),
(38, 17, '2023-08-18 07:43:07', '2023-08-18 07:43:07'),
(38, 18, '2023-08-18 07:43:07', '2023-08-18 07:43:07'),
(39, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(39, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(41, 1, '2023-08-22 10:39:10', '2023-08-22 10:39:10'),
(41, 2, '2023-08-22 10:25:38', '2023-08-22 10:25:38'),
(41, 4, '2023-08-22 10:26:41', '2023-08-22 10:26:41'),
(41, 7, '2023-08-22 10:37:45', '2023-08-22 10:37:45'),
(41, 9, '2023-08-22 10:39:06', '2023-08-22 10:39:06'),
(41, 10, '2023-08-22 10:38:39', '2023-08-22 10:38:39'),
(41, 14, '2023-08-22 10:38:56', '2023-08-22 10:38:56'),
(41, 15, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(41, 16, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(41, 17, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(41, 18, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(42, 2, '2023-08-22 10:39:51', '2023-08-22 10:39:51'),
(42, 10, '2023-08-22 10:39:32', '2023-08-22 10:39:32'),
(42, 11, '2023-08-22 10:39:32', '2023-08-22 10:39:32'),
(42, 13, '2023-08-22 10:26:53', '2023-08-22 10:26:53'),
(43, 2, '2023-08-22 10:39:51', '2023-08-22 10:39:51'),
(43, 10, '2023-08-22 10:39:32', '2023-08-22 10:39:32'),
(43, 11, '2023-08-22 10:39:32', '2023-08-22 10:39:32'),
(43, 13, '2023-08-22 10:26:53', '2023-08-22 10:26:53'),
(46, 2, '2023-08-10 14:36:09', '2023-08-10 14:36:09'),
(46, 5, '2023-08-10 14:36:09', '2023-08-10 14:36:09'),
(46, 7, '2023-08-10 14:36:09', '2023-08-10 14:36:09'),
(47, 1, '2023-08-22 10:39:10', '2023-08-22 10:39:10'),
(47, 2, '2023-08-09 14:56:29', '2023-08-09 14:56:29'),
(47, 4, '2023-08-10 14:37:15', '2023-08-10 14:37:15'),
(47, 7, '2023-08-22 10:37:45', '2023-08-22 10:37:45'),
(47, 9, '2023-08-22 10:39:06', '2023-08-22 10:39:06'),
(47, 10, '2023-08-22 10:38:39', '2023-08-22 10:38:39'),
(47, 14, '2023-08-22 10:38:56', '2023-08-22 10:38:56'),
(47, 15, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(47, 16, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(47, 17, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(47, 18, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(49, 1, '2023-08-22 10:39:10', '2023-08-22 10:39:10'),
(49, 2, '2023-08-09 14:56:29', '2023-08-09 14:56:29'),
(49, 4, '2023-08-10 14:37:15', '2023-08-10 14:37:15'),
(49, 7, '2023-08-22 10:37:45', '2023-08-22 10:37:45'),
(49, 9, '2023-08-22 10:39:06', '2023-08-22 10:39:06'),
(49, 10, '2023-08-22 10:38:39', '2023-08-22 10:38:39'),
(49, 14, '2023-08-22 10:38:56', '2023-08-22 10:38:56'),
(49, 15, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(49, 16, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(49, 17, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(49, 18, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(50, 1, '2023-08-22 10:39:10', '2023-08-22 10:39:10'),
(50, 2, '2023-08-09 14:56:29', '2023-08-09 14:56:29'),
(50, 4, '2023-08-10 14:37:15', '2023-08-10 14:37:15'),
(50, 7, '2023-08-22 10:37:46', '2023-08-22 10:37:46'),
(50, 9, '2023-08-22 10:39:06', '2023-08-22 10:39:06'),
(50, 10, '2023-08-22 10:38:39', '2023-08-22 10:38:39'),
(50, 14, '2023-08-22 10:38:56', '2023-08-22 10:38:56'),
(50, 15, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(50, 16, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(50, 17, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(50, 18, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(51, 1, '2023-08-22 10:39:10', '2023-08-22 10:39:10'),
(51, 2, '2023-08-09 14:56:29', '2023-08-09 14:56:29'),
(51, 4, '2023-08-10 14:37:15', '2023-08-10 14:37:15'),
(51, 7, '2023-08-22 10:37:46', '2023-08-22 10:37:46'),
(51, 9, '2023-08-22 10:39:06', '2023-08-22 10:39:06'),
(51, 10, '2023-08-22 10:38:39', '2023-08-22 10:38:39'),
(51, 14, '2023-08-22 10:38:56', '2023-08-22 10:38:56'),
(51, 15, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(51, 16, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(51, 17, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(51, 18, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(52, 1, '2023-08-22 10:39:10', '2023-08-22 10:39:10'),
(52, 2, '2023-08-10 14:37:15', '2023-08-10 14:37:15'),
(52, 4, '2023-08-22 10:26:41', '2023-08-22 10:26:41'),
(52, 7, '2023-08-22 10:37:46', '2023-08-22 10:37:46'),
(52, 9, '2023-08-22 10:39:06', '2023-08-22 10:39:06'),
(52, 10, '2023-08-22 10:38:39', '2023-08-22 10:38:39'),
(52, 14, '2023-08-22 10:38:56', '2023-08-22 10:38:56'),
(52, 15, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(52, 16, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(52, 17, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(52, 18, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(59, 1, '2023-08-25 10:28:18', '2023-08-25 10:28:18'),
(59, 2, '2023-08-25 10:28:18', '2023-08-25 10:28:18'),
(59, 3, '2023-08-25 10:28:18', '2023-08-25 10:28:18'),
(59, 4, '2023-08-25 10:28:18', '2023-08-25 10:28:18'),
(59, 5, '2023-08-25 10:28:18', '2023-08-25 10:28:18'),
(59, 6, '2023-08-25 10:28:18', '2023-08-25 10:28:18'),
(59, 7, '2023-08-25 10:28:18', '2023-08-25 10:28:18'),
(59, 8, '2023-08-25 10:28:18', '2023-08-25 10:28:18'),
(59, 9, '2023-08-25 10:28:18', '2023-08-25 10:28:18'),
(59, 10, '2023-08-25 10:28:18', '2023-08-25 10:28:18'),
(59, 11, '2023-08-25 10:28:18', '2023-08-25 10:28:18'),
(59, 12, '2023-08-25 10:28:18', '2023-08-25 10:28:18'),
(59, 13, '2023-08-25 10:28:18', '2023-08-25 10:28:18'),
(59, 14, '2023-08-25 10:28:18', '2023-08-25 10:28:18'),
(59, 15, '2023-08-25 10:28:18', '2023-08-25 10:28:18'),
(59, 16, '2023-08-25 10:28:18', '2023-08-25 10:28:18'),
(59, 17, '2023-08-25 10:28:18', '2023-08-25 10:28:18'),
(59, 18, '2023-08-25 10:28:18', '2023-08-25 10:28:18'),
(108, 1, '2023-08-22 10:39:10', '2023-08-22 10:39:10'),
(108, 2, '2023-08-22 10:25:38', '2023-08-22 10:25:38'),
(108, 4, '2023-08-22 10:26:41', '2023-08-22 10:26:41'),
(108, 7, '2023-08-22 10:37:46', '2023-08-22 10:37:46'),
(108, 9, '2023-08-22 10:39:06', '2023-08-22 10:39:06'),
(108, 10, '2023-08-22 10:38:39', '2023-08-22 10:38:39'),
(108, 14, '2023-08-22 10:38:56', '2023-08-22 10:38:56'),
(108, 15, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(108, 16, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(108, 17, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(108, 18, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(110, 1, '2023-08-22 10:39:10', '2023-08-22 10:39:10'),
(110, 2, '2023-08-22 10:25:38', '2023-08-22 10:25:38'),
(110, 4, '2023-08-22 10:26:41', '2023-08-22 10:26:41'),
(110, 7, '2023-08-22 10:37:46', '2023-08-22 10:37:46'),
(110, 9, '2023-08-22 10:39:06', '2023-08-22 10:39:06'),
(110, 10, '2023-08-22 10:38:39', '2023-08-22 10:38:39'),
(110, 14, '2023-08-22 10:38:56', '2023-08-22 10:38:56'),
(110, 15, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(110, 16, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(110, 17, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(110, 18, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(112, 1, '2023-08-22 10:39:10', '2023-08-22 10:39:10'),
(112, 2, '2023-08-22 10:25:38', '2023-08-22 10:25:38'),
(112, 4, '2023-08-22 10:26:41', '2023-08-22 10:26:41'),
(112, 7, '2023-08-22 10:37:46', '2023-08-22 10:37:46'),
(112, 9, '2023-08-22 10:39:06', '2023-08-22 10:39:06'),
(112, 10, '2023-08-22 10:38:39', '2023-08-22 10:38:39'),
(112, 14, '2023-08-22 10:38:56', '2023-08-22 10:38:56'),
(112, 15, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(112, 16, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(112, 17, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(112, 18, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(114, 1, '2023-08-22 10:39:11', '2023-08-22 10:39:11'),
(114, 2, '2023-08-22 10:25:38', '2023-08-22 10:25:38'),
(114, 4, '2023-08-22 10:26:41', '2023-08-22 10:26:41'),
(114, 7, '2023-08-22 10:37:46', '2023-08-22 10:37:46'),
(114, 9, '2023-08-22 10:39:06', '2023-08-22 10:39:06'),
(114, 10, '2023-08-22 10:38:39', '2023-08-22 10:38:39'),
(114, 14, '2023-08-22 10:38:56', '2023-08-22 10:38:56'),
(114, 15, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(114, 16, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(114, 17, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(114, 18, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(116, 1, '2023-08-22 10:39:11', '2023-08-22 10:39:11'),
(116, 2, '2023-08-22 10:25:38', '2023-08-22 10:25:38'),
(116, 4, '2023-08-22 10:26:41', '2023-08-22 10:26:41'),
(116, 7, '2023-08-22 10:37:46', '2023-08-22 10:37:46'),
(116, 9, '2023-08-22 10:39:06', '2023-08-22 10:39:06'),
(116, 10, '2023-08-22 10:38:39', '2023-08-22 10:38:39'),
(116, 14, '2023-08-22 10:38:56', '2023-08-22 10:38:56'),
(116, 15, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(116, 16, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(116, 17, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(116, 18, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(118, 1, '2023-08-22 10:39:11', '2023-08-22 10:39:11'),
(118, 2, '2023-08-22 10:25:38', '2023-08-22 10:25:38'),
(118, 4, '2023-08-22 10:26:41', '2023-08-22 10:26:41'),
(118, 7, '2023-08-22 10:37:46', '2023-08-22 10:37:46'),
(118, 9, '2023-08-22 10:39:06', '2023-08-22 10:39:06'),
(118, 10, '2023-08-22 10:38:39', '2023-08-22 10:38:39'),
(118, 14, '2023-08-22 10:38:56', '2023-08-22 10:38:56'),
(118, 15, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(118, 16, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(118, 17, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(118, 18, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(120, 1, '2023-08-22 10:39:11', '2023-08-22 10:39:11'),
(120, 2, '2023-08-22 10:25:38', '2023-08-22 10:25:38'),
(120, 4, '2023-08-22 10:26:41', '2023-08-22 10:26:41'),
(120, 7, '2023-08-22 10:37:46', '2023-08-22 10:37:46'),
(120, 9, '2023-08-22 10:39:06', '2023-08-22 10:39:06'),
(120, 10, '2023-08-22 10:38:39', '2023-08-22 10:38:39'),
(120, 14, '2023-08-22 10:38:56', '2023-08-22 10:38:56'),
(120, 15, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(120, 16, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(120, 17, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(120, 18, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(122, 1, '2023-08-22 10:39:11', '2023-08-22 10:39:11'),
(122, 2, '2023-08-22 10:25:38', '2023-08-22 10:25:38'),
(122, 4, '2023-08-22 10:26:41', '2023-08-22 10:26:41'),
(122, 7, '2023-08-22 10:37:46', '2023-08-22 10:37:46'),
(122, 9, '2023-08-22 10:39:06', '2023-08-22 10:39:06'),
(122, 10, '2023-08-22 10:38:39', '2023-08-22 10:38:39'),
(122, 14, '2023-08-22 10:38:56', '2023-08-22 10:38:56'),
(122, 15, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(122, 16, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(122, 17, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(122, 18, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(126, 1, '2023-08-22 10:39:11', '2023-08-22 10:39:11'),
(126, 2, '2023-08-22 10:25:38', '2023-08-22 10:25:38'),
(126, 4, '2023-08-22 10:26:41', '2023-08-22 10:26:41'),
(126, 7, '2023-08-22 10:37:46', '2023-08-22 10:37:46'),
(126, 9, '2023-08-22 10:39:06', '2023-08-22 10:39:06'),
(126, 10, '2023-08-22 10:38:39', '2023-08-22 10:38:39'),
(126, 14, '2023-08-22 10:38:56', '2023-08-22 10:38:56'),
(126, 15, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(126, 16, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(126, 17, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(126, 18, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(128, 1, '2023-08-22 10:39:11', '2023-08-22 10:39:11'),
(128, 2, '2023-08-22 10:25:38', '2023-08-22 10:25:38'),
(128, 4, '2023-08-22 10:26:41', '2023-08-22 10:26:41'),
(128, 7, '2023-08-22 10:37:46', '2023-08-22 10:37:46'),
(128, 9, '2023-08-22 10:39:06', '2023-08-22 10:39:06'),
(128, 10, '2023-08-22 10:38:39', '2023-08-22 10:38:39'),
(128, 14, '2023-08-22 10:38:56', '2023-08-22 10:38:56'),
(128, 15, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(128, 16, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(128, 17, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(128, 18, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(130, 1, '2023-08-22 10:39:11', '2023-08-22 10:39:11'),
(130, 2, '2023-08-22 10:25:38', '2023-08-22 10:25:38'),
(130, 4, '2023-08-22 10:26:41', '2023-08-22 10:26:41'),
(130, 7, '2023-08-22 10:37:46', '2023-08-22 10:37:46'),
(130, 9, '2023-08-22 10:39:06', '2023-08-22 10:39:06'),
(130, 10, '2023-08-22 10:38:39', '2023-08-22 10:38:39'),
(130, 14, '2023-08-22 10:38:56', '2023-08-22 10:38:56'),
(130, 15, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(130, 16, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(130, 17, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(130, 18, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(132, 1, '2023-08-22 10:39:11', '2023-08-22 10:39:11'),
(132, 2, '2023-08-22 10:25:38', '2023-08-22 10:25:38'),
(132, 4, '2023-08-22 10:26:41', '2023-08-22 10:26:41'),
(132, 7, '2023-08-22 10:37:46', '2023-08-22 10:37:46'),
(132, 9, '2023-08-22 10:39:06', '2023-08-22 10:39:06'),
(132, 10, '2023-08-22 10:38:39', '2023-08-22 10:38:39'),
(132, 14, '2023-08-22 10:38:56', '2023-08-22 10:38:56'),
(132, 15, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(132, 16, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(132, 17, '2023-08-22 10:39:16', '2023-08-22 10:39:16'),
(132, 18, '2023-08-22 10:39:16', '2023-08-22 10:39:16');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `batiments`
--
ALTER TABLE `batiments`
  ADD CONSTRAINT `batiments_ibfk_1` FOREIGN KEY (`establishmentId`) REFERENCES `establishments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`linkedTo`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `fk_products_images` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_establishments` FOREIGN KEY (`establishmentId`) REFERENCES `establishments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_has_permission`
--
ALTER TABLE `user_has_permission`
  ADD CONSTRAINT `user_has_permission_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_has_permission_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
