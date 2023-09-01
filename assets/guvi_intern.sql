-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 19, 2022 at 03:28 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `guvi_intern`
--

-- --------------------------------------------------------

--
-- Table structure for table `userlogin`
--

CREATE TABLE `userlogin` (
  `email` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userlogin`
--

INSERT INTO `userlogin` (`email`, `password`) VALUES
('0@0.com', '$2y$10$8DGGqjdmhe84luyykrziauv5O70TGAsi7ywuPI3OwrwPVQiKZO1Vi'),
('dummy0@gmail.com', '$2y$10$80cX7oD7kc5Z/i10cuKZner9SheepQC.D2P.nyZSsNN7VZHXyuLD2'),
('rishikesh@gmail.com', '$2y$10$aYbhgz/hSeU5BWlxKFYwBuGCP8F9E6PJkZhPGUG/UJFiXO.rPTqhe'),
('testy@gmail.com', '$2y$10$7FsD2IIhsUqCv5UwdhnXGu4bse35PWm52I/d9BYFz6Y.sLUW8fooO');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `userlogin`
--
ALTER TABLE `userlogin`
  ADD PRIMARY KEY (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
