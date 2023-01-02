-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 02, 2023 at 02:15 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `snap_admin`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_us`
--

CREATE TABLE `about_us` (
  `id` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `subtitle` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `photo_uri` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `ID` varchar(200) DEFAULT NULL,
  `TYPE` varchar(50) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `PHOTO_URI` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `STATUS` varchar(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`ID`, `TYPE`, `NAME`, `PHOTO_URI`, `STATUS`) VALUES
('bb4a6462-c412-4ea0-9fff-303e1fe166da', '', 'Harappa', '[\"uploads\\\\1672665266413.jpeg\"]', '0');

-- --------------------------------------------------------

--
-- Table structure for table `home_page`
--

CREATE TABLE `home_page` (
  `id` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `subtitle` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `photo_uri` varchar(100) DEFAULT NULL,
  `section` text NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `home_page`
--

INSERT INTO `home_page` (`id`, `title`, `subtitle`, `description`, `photo_uri`, `section`, `status`) VALUES
('d6d005d0-dfb1-475b-9432-9b028c5b4b03', 'asdasdas', 'asdasdasd', 'asdasdasdasd', NULL, 'MIDDLE', 0),
('b4ea8147-456a-4d82-b4fb-f041008c4220', 'Home Page Title', 'Home Page SubTitle', 'Home Page description', NULL, 'MIDDLE', 0);

-- --------------------------------------------------------

--
-- Table structure for table `our_factories`
--

CREATE TABLE `our_factories` (
  `id` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `subtitle` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `photo_uri` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` varchar(100) NOT NULL,
  `related_category` varchar(50) NOT NULL,
  `style_name` varchar(50) NOT NULL,
  `style_number` varchar(50) NOT NULL,
  `sort_number` varchar(50) NOT NULL,
  `fabric_description` varchar(500) NOT NULL,
  `wash_details` varchar(500) NOT NULL,
  `photo_uri` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `related_category`, `style_name`, `style_number`, `sort_number`, `fabric_description`, `wash_details`, `photo_uri`, `status`) VALUES
('974d787e-5ace-48fb-8290-651b073edad8', 'Others', 'Denim', 'DN009', 'MD12345', 'Its good', 'Very good wash details', '[]', 0);

-- --------------------------------------------------------

--
-- Table structure for table `the_start`
--

CREATE TABLE `the_start` (
  `id` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `photo_uri` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `what_we_do`
--

CREATE TABLE `what_we_do` (
  `id` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `subtitle` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `photo_uri` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
