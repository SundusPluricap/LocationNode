-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 21, 2023 at 07:23 AM
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
(3, 'pluricap', '1 a d\'alsace', '1690380559847.png', '2023-07-26 14:09:19', '2023-07-26 14:29:00', 2),
(4, 'bat', '1 avenu', '1690381707052.png', '2023-07-26 14:18:23', '2023-07-26 14:28:27', 2),
(6, 'BatiBati', '3 rue  de my heart', '1691505591058.png', '2023-08-08 14:39:51', '2023-08-08 14:39:51', 2),
(7, 'BatiBati', '3 rue  de my heart', '1691505803934.png', '2023-08-08 14:43:23', '2023-08-24 10:44:30', 3);

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
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `firstName`, `lastName`, `email`, `phoneNumber`, `adresse`, `codePostal`, `country`, `companyName`, `createdAt`, `updatedAt`, `createdBy`, `linkedTo`) VALUES
(111, 'try', 'me', 'ss@ss.ss', '09743674', 'ss', '', 'France', 'ss', '2023-08-23 12:49:07', '2023-08-23 12:49:07', 39, 59),
(112, 'joohn', 'doe', 'ss@ss.ss', '0782319800', '3 rue  de my heart', '', 'France', 'pl', '2023-08-23 12:56:55', '2023-08-23 12:56:55', 38, 34),
(114, 'test', 'user', 'ss@ss.ss', 'sssa5342', 'ss', '', 'France', 'ss', '2023-08-23 14:24:35', '2023-08-23 14:24:35', 59, 59),
(118, 'cli', '2', 'ss@ss.ss', '534', '1sdf', '67000', 'France', 'plu', '2023-08-29 07:49:01', '2023-08-29 07:49:01', 38, 34);

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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `establishments`
--

INSERT INTO `establishments` (`id`, `name`, `createdAt`, `updatedAt`, `adresse`, `codePostal`, `country`, `SIRET`, `bankName`, `IBAN`, `BIC`) VALUES
(2, 'Pluricap', '2023-07-26 08:18:39', '2023-08-25 10:27:11', '1 a d\'alsace ', '67000', 'France ', '32635257', ' BNP ', '3TZERT34', ' \"\'TG3v '),
(3, 'Gestlearn', '2023-08-03 14:50:13', '2023-08-25 10:26:05', '1 a d\'alsace', '67000', 'France', '32635257', 'BNP', '3TZERT34', '\"\'TG3v'),
(24, 'Pedagogia', '2023-08-28 08:24:31', '2023-08-28 08:24:31', '1 a d\'alsace', '67000', 'France', 'je sais pas', 'BNP', 'je sais pas', 'je sais pas'),
(25, 'test', '2023-08-28 09:03:47', '2023-08-28 09:03:47', '1 a d\'alsace', '67000', 'France', '?', '?', '?', '?'),
(26, 'Ge2', '2023-08-30 12:16:49', '2023-08-30 12:16:49', '114 rue de gare', '67500', 'France', '4543 ', 'BNP', '343E2', '4TE3'),
(27, 'GE33', '2023-08-30 12:22:44', '2023-08-30 12:22:44', '2 rue de paris', '67647', 'France', '36TRGGG', 'BNP', 'JUR', 'R5YEH'),
(28, 'Try', '2023-08-30 12:38:47', '2023-08-30 12:38:47', 'hiy', 'EY456', 'France', '\'res\"\'z(b', 'tbe', 'ert', 'erb'),
(29, 'Test', '2023-08-30 12:39:35', '2023-08-30 12:39:35', 'aetae', 'fefe', 'France', 'zegzeg', 'zrgzqrg', 'qgerwg', 'qrgqrg');

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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(18, 'reserve Salle', '2023-08-17 10:12:27', '2023-08-17 10:12:27', NULL),
(19, 'create establishment', '2023-08-28 07:31:43', '2023-08-28 07:31:43', NULL),
(20, 'view reservation', '2023-08-31 11:58:51', '2023-08-31 11:58:51', NULL),
(22, 'edit reservation\r\n', '2023-08-31 12:05:49', '2023-08-31 12:05:49', NULL),
(23, 'delete reservation', '2023-08-31 12:05:49', '2023-08-31 12:05:49', NULL);

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
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
CREATE TABLE IF NOT EXISTS `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `startDate` timestamp NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `objet` varchar(255) DEFAULT NULL,
  `nbrPeople` float NOT NULL,
  `status` enum('pending','confirmed','canceled') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'pending',
  `devis` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `facture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `salleId` int NOT NULL,
  `userId` int NOT NULL,
  `clientId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `salleId` (`salleId`),
  KEY `userId` (`userId`),
  KEY `clientId` (`clientId`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `startDate`, `startTime`, `endTime`, `objet`, `nbrPeople`, `status`, `devis`, `facture`, `createdAt`, `updatedAt`, `salleId`, `userId`, `clientId`) VALUES
(1, '2023-08-03 00:00:00', '00:00:00', '00:00:00', '', 2, 'pending', 'devis_6b61872a-59b0-41f8-9017-3adc1eed89c1.pdf', NULL, '2023-08-30 15:02:31', '2023-08-30 15:02:31', 1, 32, 112),
(2, '2023-08-04 00:00:00', '00:00:00', '00:00:00', '', 3, 'pending', 'devis_ece4b528-36b5-428a-b6ef-3241ed7576ca.pdf', NULL, '2023-08-30 15:04:36', '2023-08-30 15:04:36', 8, 39, 112),
(3, '2023-08-10 00:00:00', '00:00:00', '00:00:00', '', 2, 'pending', 'devis_7bc09e53-de39-4558-92e5-5ec3fbc10ea1.pdf', NULL, '2023-08-30 15:10:09', '2023-08-30 15:10:09', 1, 38, 112),
(4, '2023-08-09 00:00:00', '06:00:00', '06:30:00', '', 2, 'pending', 'devis_612a96b3-61ac-4a43-827c-cb3466b498dd.pdf', NULL, '2023-08-30 15:13:17', '2023-08-30 15:13:17', 1, 38, 112),
(5, '2023-08-01 00:00:00', '12:00:00', '12:30:00', '', 2, 'pending', 'devis_0f572122-40de-4921-9c3b-4c5beebb0fba.pdf', NULL, '2023-08-31 10:00:21', '2023-08-31 10:00:21', 4, 38, 118),
(6, '2023-08-31 00:00:00', '12:30:00', '01:00:00', '', 3, 'pending', 'devis_72ffc48b-1d6a-40d7-bf82-bf078cd513ee.pdf', NULL, '2023-08-31 10:01:44', '2023-08-31 10:01:44', 17, 38, 112),
(7, '2023-08-31 00:00:00', '01:00:00', '01:30:00', '', 3, 'pending', 'devis_b0512f81-ccd1-4603-9de1-c8abf33e3ccc.pdf', NULL, '2023-08-31 10:02:53', '2023-08-31 10:02:53', 3, 38, 111),
(8, '2023-08-03 00:00:00', '12:30:00', '03:00:00', '', 10, 'pending', 'devis_f021982c-f086-466e-a432-9bb36d0f929a.pdf', NULL, '2023-08-31 10:06:05', '2023-08-31 10:06:05', 2, 38, 114),
(9, '2023-08-07 00:00:00', '01:00:00', '01:30:00', '', 2, 'pending', 'devis_fb463c6c-51a5-4f3e-a0b1-368a0e64eaea.pdf', NULL, '2023-08-31 10:07:00', '2023-08-31 10:07:00', 1, 38, 111),
(10, '2023-08-04 00:00:00', '12:30:00', '12:30:00', '', 1, 'pending', 'devis_92e3e738-5562-4472-936f-72dee9cca1ec.pdf', NULL, '2023-08-31 10:10:22', '2023-08-31 10:10:22', 2, 38, 112),
(11, '2023-09-13 00:00:00', '08:30:00', '09:30:00', '', 3, 'pending', 'devis_a1e67c0c-99b3-4253-a02e-39a279f8dd3a.pdf', NULL, '2023-09-02 17:44:35', '2023-09-02 17:44:35', 2, 38, 112),
(12, '2023-09-07 00:00:00', '00:00:00', '00:00:00', '', 9, 'pending', 'devis_e924b993-5b6b-4bf6-ae90-9c484d513eee.pdf', NULL, '2023-09-20 12:55:07', '2023-09-20 12:55:07', 17, 38, 114),
(13, '2023-09-18 00:00:00', '00:00:00', '00:00:00', 'gi', 2, 'pending', 'devis_fa3a4106-9cd9-4637-aeee-0dbdad141da8.pdf', NULL, '2023-09-20 12:57:13', '2023-09-20 12:57:13', 20, 38, 118),
(14, '2023-09-19 00:00:00', '00:00:00', '00:00:00', '', 2, 'pending', 'devis_754bc461-9ed8-4b5e-8e88-51a92074cd53.pdf', NULL, '2023-09-20 13:03:09', '2023-09-20 13:03:09', 1, 38, 111),
(15, '2023-09-29 00:00:00', '03:30:00', '04:00:00', '', 1, 'pending', 'devis_bbb153bf-7244-42ff-8e73-3de90f3232d6.pdf', NULL, '2023-09-20 13:06:27', '2023-09-20 13:06:27', 9, 38, 111),
(16, '2023-09-06 00:00:00', '11:30:00', '01:00:00', '', 1, 'pending', 'devis_bd8ec37c-7e82-48df-be27-c7d8c3a476b9.pdf', NULL, '2023-09-20 13:07:32', '2023-09-20 13:07:32', 14, 38, 111),
(17, '2023-09-15 00:00:00', '15:30:00', '16:30:00', '', 2, 'pending', 'devis_6e45495c-94e3-42fd-988b-2bbcaeaf1bec.pdf', NULL, '2023-09-20 13:13:35', '2023-09-20 13:13:35', 3, 38, 111),
(18, '2023-09-01 00:00:00', '23:30:00', '01:30:00', '', 2, 'pending', 'devis_1619f980-e7e6-4372-84da-de3effa9cbd0.pdf', NULL, '2023-09-20 13:14:44', '2023-09-20 13:14:44', 1, 38, 111),
(19, '2023-09-28 00:00:00', '15:30:00', '16:00:00', 'th', 1, 'pending', 'devis_83534e55-1c5a-4876-9dc4-7579cf26220d.pdf', NULL, '2023-09-20 13:19:55', '2023-09-20 13:19:55', 10, 38, 111);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
CREATE TABLE IF NOT EXISTS `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `capacity` int DEFAULT NULL,
  `price` varchar(255) NOT NULL,
  `TVA` varchar(225) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `batiment_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rooms_batiments` (`batiment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `capacity`, `price`, `TVA`, `createdAt`, `updatedAt`, `batiment_id`) VALUES
(1, 'Salle creation edited', 34, '345', NULL, '2023-07-28 06:46:15', '2023-08-25 10:31:13', 2),
(2, 'Salle creation3', 3, '450', NULL, '2023-07-28 06:47:36', '2023-07-28 06:47:36', 1),
(3, 'Salle creation3', 3, '450', NULL, '2023-07-28 06:49:21', '2023-07-28 06:49:21', 2),
(4, 'Salle 1', 1, '350', NULL, '2023-07-28 06:57:13', '2023-07-28 06:57:13', 3),
(5, 'salle2', 1, '560', NULL, '2023-07-28 07:01:48', '2023-07-28 07:01:48', 4),
(6, '3', 3, '34', NULL, '2023-07-28 07:03:38', '2023-07-28 07:03:38', 5),
(7, 'Salle 4', 4, '445', NULL, '2023-07-28 07:08:35', '2023-07-31 10:41:14', 6),
(8, 'ss', 3, '', NULL, '2023-07-28 07:29:46', '2023-07-31 05:48:02', 7),
(9, '3', 3, '34', NULL, '2023-07-28 07:31:24', '2023-07-28 07:31:24', 2),
(10, 'Salle 1', 1, '350', NULL, '2023-07-28 07:37:07', '2023-07-28 08:38:51', 1),
(11, 'vv', 1, '360', NULL, '2023-07-28 08:08:11', '2023-07-28 08:22:46', 1),
(12, 'Salle 1', 8, '899', NULL, '2023-07-28 14:38:13', '2023-07-31 08:06:56', 7),
(13, 'zd', 1, '10.00', NULL, '2023-08-08 12:26:14', '2023-08-08 12:26:14', 4),
(14, 'test', 2, '20.00', NULL, '2023-08-16 08:42:45', '2023-08-25 08:26:53', 2),
(15, 'test', 1, '20.00', NULL, '2023-08-16 12:58:53', '2023-08-25 10:31:38', 18),
(16, 'test2', 2, '20.00', NULL, '2023-08-16 12:59:47', '2023-08-16 12:59:47', 2),
(17, 'try new', 500, '262', NULL, '2023-08-24 09:07:12', '2023-08-24 09:07:38', 2),
(18, 'test 25/08 9:41', 2, '13584', NULL, '2023-08-25 07:44:43', '2023-08-25 07:44:43', 2),
(19, '08/25 9:45', 2, '3', NULL, '2023-08-25 07:45:56', '2023-08-25 08:18:15', 2),
(20, '08/25 10:16', 4, '7', NULL, '2023-08-25 08:16:45', '2023-08-25 08:29:38', 18);

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
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `role`, `createdAt`, `updatedAt`, `establishmentId`) VALUES
(32, 'jane', 'dodo', 'Alan@dodo.cc', '$2b$10$p.4N2yxM6O6eY89ndV382.zr4OR46/lojbdcPRU56cb7fDjHSxOMy', 'admin', '2023-08-02 08:06:33', '2023-08-28 14:49:29', 2),
(34, 'Super', 'Admin', 'super.admin@gmail.com', '$2b$10$IEiObjdvZjHqlpatDRjdoeF0zJf82bXMoQvntb5tOGEIpwkNJSFxa', 'superAdmin', '2023-08-02 08:23:38', '2023-08-02 08:41:26', 2),
(38, 'Sundus ', 'Queen', 'sundus.pluricap@gmail.com', '$2b$10$CKHjMM06NU/iaYQ6aToU4O8/hMIooFIrvoJoun2wTp5xm0CW/XlQm', 'kingAdmin', '2023-08-03 10:07:49', '2023-08-03 14:36:31', 2),
(39, 'sundus', 'admin', 'sundus.pluricap@gmail.com', '$2b$10$I4nNp5JsPXztEglCMzNg4Od09plU4OdKnmg0jgA0DYYwFYJ1yzaRm', 'admin', '2023-08-03 13:38:32', '2023-08-03 13:39:36', 3),
(40, 'test', 'admin', 'test@email.com', '$2b$10$u8a/VfI9vRHJZsCHIr7yH./cQMJCZOKgotiTBA.wChViTC4nPiDw2', 'admin', '2023-08-03 13:52:45', '2023-08-03 13:52:45', 3),
(44, 'ss edited', 'ss edited', 'ss@ss.ss', '$2b$10$bONsSPf67Qotq/2ZMtOy/e96/vrknYbNsvsnUpwwyy0DiBXRzIQcC', 'editor', '2023-08-03 14:35:12', '2023-08-28 15:18:02', 2),
(46, 'sundus', 'alkebsi', 'sundus@gmail.com', '$2b$10$MM4N6gJ.vAIoMo0C3rrLjOiU7QSMbdb7O/MsF68IlgVCr0mRgMJ4y', 'editor', '2023-08-03 14:53:33', '2023-08-03 14:53:33', 2),
(59, 'super', 'super admin', 'test@gmail.com', '$2b$10$nnZCu5sXLdZYRp6I3B6C3eksqVprmSgLkuIonnuDMTQzVUXAYuHM2', 'superAdmin', '2023-08-21 13:25:37', '2023-08-23 14:25:38', 3),
(103, 'unit test', 'unit test', 'unit test', '$2b$10$P6c3tYe1lV.9Mwdl/eYUgefdpXPVio4yQimf2RR5y4KgdzZRFvSVy', 'unit test', '2023-08-21 14:56:20', '2023-08-21 14:56:20', 3),
(105, 'unit test', 'unit test', 'unit test', '$2b$10$ne85.bZXJ7Hl/H1/Djzj8O5wsuIeO5whjRzGRYW1/kHpPo60zZ8ES', 'unit test', '2023-08-21 14:58:15', '2023-08-21 14:58:15', 3),
(107, 'unit test', 'unit test', 'unit test', '$2b$10$xljlg68TVmOh3dqHTCVX2.QPdJ7gGRu/.obCHyQ7BUCPCS8wA2Fyy', 'unit test', '2023-08-21 14:59:54', '2023-08-21 14:59:54', 3),
(109, 'unit test', 'unit test', 'unit test', '$2b$10$IGPHRqCcnUqWNzUU.ik10eaG07cB/xylkIsz78uqbnwCkCPbgBz3C', 'unit test', '2023-08-21 15:01:25', '2023-08-21 15:01:25', 3),
(111, 'unit test', 'unit test', 'unit test', '$2b$10$qoKS/B.FmHZCBZoAhocnJuCRddn.lw76NMgprf6/Nq47lEvlb5u8a', 'unit test', '2023-08-21 15:02:51', '2023-08-21 15:02:51', 3),
(113, 'unit test', 'unit test', 'unit test', '$2b$10$45QmQFmmndW6CrZ.AgXGs.OAHOGaFx0HoWgu5Ng8Eb1w3ziZ9qFne', 'admin', '2023-08-21 15:05:25', '2023-08-21 15:05:25', 3),
(115, 'unit test', 'unit test', 'unit test', '$2b$10$mRSg5Xw8mXP7m1UJQlEPTOazJbm1od4sHVcrzvwg5AT54r5p75gay', 'admin', '2023-08-21 15:06:12', '2023-08-21 15:06:12', 3),
(117, 'unit test', 'unit test', 'unit test', '$2b$10$/G54abgJs3Sag2HG8QPnZOtXgDQ0IzOythGR5I8o5XdqKNidnCakO', 'admin', '2023-08-21 15:07:36', '2023-08-21 15:07:36', 3),
(119, 'unit test', 'unit test', 'unit test', '$2b$10$b8XE0mCgJW0Xy1gTo3tc.etVygHHnoXtIuq8tZlNoot2q0VrN6OMK', 'admin', '2023-08-21 15:08:58', '2023-08-21 15:08:58', 3),
(121, 'unit test', 'unit test', 'unit test', '$2b$10$Fs9794xZKBCOdl.rI5tmC.pAvBeQ/SDGX71WLy.kR8vcd7vKUCN4i', 'admin', '2023-08-21 15:10:45', '2023-08-21 15:10:45', 3),
(123, 'unit test', 'unit test', 'unit test', '$2b$10$XCK/IuxuZjvNJz6uKtHoTeVzJ2SnUjNH/biJLoxCufDQCnElyDWq.', 'admin', '2023-08-21 15:11:42', '2023-08-21 15:11:42', 3),
(125, 'unit test', 'unit test', 'unit test', '$2b$10$Dp4nMDfJedffokz361W6h.5DY45BvIazPrgNpyK1IDLIs1QZ5e1KO', 'admin', '2023-08-21 15:13:12', '2023-08-21 15:13:12', 3),
(127, 'unit test', 'unit test', 'unit test', '$2b$10$0QyFsN7ajycG0kqogTsXNOJk39kuS.ZtfK6fgl8OnVF9VCa7PfUGS', 'admin', '2023-08-21 15:18:15', '2023-08-21 15:18:15', 3),
(129, 'unit test', 'unit test', 'unit test', '$2b$10$nehtFvPxamtTtrsdr9c.wuHs5YTVHZ6T5YmdmX8IWG./8TVjJD.Sq', 'admin', '2023-08-21 15:18:32', '2023-08-21 15:18:32', 3),
(131, 'unit test', 'unit test', 'unit test', '$2b$10$I4y8KihXtco0VMvX1mwlQ.Rc963f.4llUx8BFL5/ulaC0IgBSOlKS', 'admin', '2023-08-21 15:19:04', '2023-08-21 15:19:04', 3),
(133, 'unit test', 'unit test', 'unit test', '$2b$10$WVhGN1UwLs7iBrLOM.WJLOuIMNUs.FOjTjodEuYdhKancQj0GUGxK', 'admin', '2023-08-22 07:46:58', '2023-08-22 07:46:58', 3),
(134, 'sundus', 'Super', 'sundus.pluricap@gmail.com', '$2b$10$cfnYnArl0vcUUzql.mt7N.V2snGOuoufd7ZUj6iDRbe2nR/GsPSY6', 'superAdmin', '2023-08-28 08:31:33', '2023-08-28 08:31:33', 24),
(135, 'sundus', 'bega', 'sss@ss.ss', '$2b$10$ouYElQ9VYgrt4tvUvQOsDOWjyEQcUzL5zkIYKvvEZBdTsp1/DvMzK', 'admin', '2023-08-28 13:30:14', '2023-08-28 13:35:35', 24),
(136, 'jj', 'd', 'Alan@rhd.dh', '$2b$10$/RBoSGMF1H/LbgI0dXqaIeIFjKSUX1..HufmWvrrM89ZuMegFVUXi', 'superAdmin', '2023-08-30 12:17:44', '2023-08-30 12:17:44', 26),
(137, 'user A', 'user A', 'email.default@gmail.com', 'default password', 'superAdmin', '2023-08-30 12:38:47', '2023-08-30 12:38:47', 28),
(138, 'user A', 'user A', 'email.default@gmail.com', 'default password', 'admin', '2023-08-30 12:38:47', '2023-08-30 12:38:47', 28),
(139, 'user A', 'user A', 'email.default@gmail.com', 'default password', 'editor', '2023-08-30 12:38:47', '2023-08-30 12:38:47', 28),
(140, 'user A', 'user A', 'email.default1@gmail.com', '$2b$10$g2uqxn6JPtv7rQfsJ4ksSO3W9r1Zr8wKysZOhrTuvbgJ6Db0M3Sl6', 'superAdmin', '2023-08-30 12:39:35', '2023-08-30 13:31:25', 29),
(141, 'user A', 'user A', 'email.default@gmail.com', 'default password', 'admin', '2023-08-30 12:39:35', '2023-08-30 12:39:35', 29),
(142, 'user A', 'user A', 'email.default@gmail.com', 'default password', 'editor', '2023-08-30 12:39:35', '2023-08-30 12:39:35', 29);

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
(32, 1, '2023-08-10 14:57:48', '2023-08-10 14:57:48'),
(32, 2, '2023-08-10 14:57:48', '2023-08-10 14:57:48'),
(32, 4, '2023-08-10 14:57:48', '2023-08-10 14:57:48'),
(32, 7, '2023-08-10 14:57:48', '2023-08-10 14:57:48'),
(32, 8, '2023-08-10 14:57:48', '2023-08-10 14:57:48'),
(34, 4, '2023-08-30 10:03:40', '2023-08-30 10:03:40'),
(34, 5, '2023-08-30 10:03:40', '2023-08-30 10:03:40'),
(34, 6, '2023-08-30 10:03:40', '2023-08-30 10:03:40'),
(34, 7, '2023-08-30 10:03:40', '2023-08-30 10:03:40'),
(34, 8, '2023-08-30 10:03:40', '2023-08-30 10:03:40'),
(34, 9, '2023-08-30 10:03:40', '2023-08-30 10:03:40'),
(34, 10, '2023-08-30 10:03:40', '2023-08-30 10:03:40'),
(34, 11, '2023-08-30 10:03:40', '2023-08-30 10:03:40'),
(34, 12, '2023-08-30 10:03:40', '2023-08-30 10:03:40'),
(34, 13, '2023-08-30 10:03:40', '2023-08-30 10:03:40'),
(34, 14, '2023-08-30 10:03:40', '2023-08-30 10:03:40'),
(34, 15, '2023-08-30 10:03:40', '2023-08-30 10:03:40'),
(34, 16, '2023-08-30 10:03:40', '2023-08-30 10:03:40'),
(34, 17, '2023-08-30 10:03:40', '2023-08-30 10:03:40'),
(34, 18, '2023-08-30 10:03:40', '2023-08-30 10:03:40'),
(39, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(39, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(39, 20, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(40, 1, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(40, 2, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(40, 20, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
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
(113, 1, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(113, 2, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(113, 20, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(115, 1, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(115, 2, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(115, 20, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(117, 1, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(117, 2, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(117, 20, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(119, 1, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(119, 2, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(119, 20, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(121, 1, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(121, 2, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(121, 20, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(123, 1, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(123, 2, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(123, 20, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(125, 1, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(125, 2, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(125, 20, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(127, 1, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(127, 2, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(127, 20, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(129, 1, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(129, 2, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(129, 20, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(131, 1, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(131, 2, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(131, 20, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(133, 1, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(133, 2, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(133, 20, '2023-09-20 13:51:31', '2023-09-20 13:51:31'),
(134, 7, '2023-08-28 08:33:15', '2023-08-28 08:33:15'),
(134, 8, '2023-08-28 09:00:25', '2023-08-28 09:00:25'),
(140, 4, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(140, 5, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(140, 6, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(140, 7, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(140, 8, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(140, 9, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(140, 10, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(140, 11, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(140, 12, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(140, 13, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(140, 14, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(140, 15, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(140, 16, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(140, 17, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(140, 18, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(141, 4, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(141, 5, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(141, 10, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(141, 11, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(141, 13, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(141, 14, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(141, 15, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(141, 16, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(141, 18, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(142, 5, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(142, 10, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(142, 13, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(142, 14, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(142, 15, '2023-08-30 12:39:35', '2023-08-30 12:39:35'),
(142, 18, '2023-08-30 12:39:35', '2023-08-30 12:39:35');

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
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservation_client_fk` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservation_salle_fk` FOREIGN KEY (`salleId`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservation_user_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
