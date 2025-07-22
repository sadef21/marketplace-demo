SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `feedback` (
  `itemId` int NOT NULL,
  `userId` int NOT NULL,
  `feedbackText` varchar(2048) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `items` (
  `itemId` int NOT NULL,
  `vendorId` int NOT NULL,
  `itemCategory` int NOT NULL DEFAULT '1',
  `itemName` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `itemDesc` varchar(4096) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `itemImg` longblob NOT NULL,
  `itemPrice` decimal(10,2) NOT NULL,
  `itemParams` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `orders` (
  `orderId` int NOT NULL,
  `userId` int NOT NULL,
  `orderContent` varchar(1024) COLLATE utf8mb4_general_ci NOT NULL,
  `orderDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `users` (
  `userId` int NOT NULL,
  `userName` varchar(16) COLLATE utf8mb4_general_ci NOT NULL,
  `userEmail` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `userPassword` varchar(16) COLLATE utf8mb4_general_ci NOT NULL,
  `userPermission` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci; 

ALTER TABLE `items`
  ADD PRIMARY KEY (`itemId`);

ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);


ALTER TABLE `items`
  MODIFY `itemId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

ALTER TABLE `orders`
  MODIFY `orderId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `users`
  MODIFY `userId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
