CREATE DATABASE  IF NOT EXISTS `tennis_log` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `tennis_log`;
-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tennis_log
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS `matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `matches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `player_one` int(11) NOT NULL,
  `player_two` int(11) NOT NULL,
  `score` varchar(45) DEFAULT '0:0',
  `tournament_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`player_one`,`player_two`,`tournament_id`),
  UNIQUE KEY `match_id_UNIQUE` (`id`),
  KEY `fk_matches_players_idx` (`player_one`),
  KEY `fk_matches_players1_idx` (`player_two`),
  KEY `fk_matches_tournaments1_idx` (`tournament_id`),
  CONSTRAINT `fk_matches_players` FOREIGN KEY (`player_one`) REFERENCES `players` (`id`),
  CONSTRAINT `fk_matches_players1` FOREIGN KEY (`player_two`) REFERENCES `players` (`id`),
  CONSTRAINT `fk_matches_tournaments1` FOREIGN KEY (`tournament_id`) REFERENCES `tournaments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matches`
--

LOCK TABLES `matches` WRITE;
/*!40000 ALTER TABLE `matches` DISABLE KEYS */;
INSERT INTO `matches` VALUES (1,'2019-01-18 00:05:00',1,1,57,'2:1',1),(2,'2019-01-01 00:05:00',1,1,61,'2:0',1),(3,'2019-01-04 00:05:00',1,1,62,'7:4 ',1),(4,NULL,1,63,56,'3:4 6:3 ',1),(5,NULL,1,57,61,'2:1',1),(6,NULL,1,63,57,'2:5',1),(40,NULL,0,61,64,'0:0',2),(47,'2019-01-01 00:05:00',0,61,63,'0:0',1),(49,NULL,1,55,57,'6:4 6:1 ',2),(50,NULL,1,63,58,'5:8 10:5 ',2),(51,NULL,0,1,56,'0:0',2),(52,NULL,1,62,1,'4:0',2),(53,NULL,1,55,1,'6:0 ',2),(55,NULL,1,58,63,'6:0',1),(56,NULL,1,64,62,'6:0',2),(61,NULL,1,57,56,'7:7 7:7 7:7 7:7 8:7',15),(62,NULL,1,55,56,'3:0',15);
/*!40000 ALTER TABLE `matches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_role`
--

DROP TABLE IF EXISTS `player_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `player_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NOT NULL,
  `name` enum('USER','ADMIN') NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`id`,`player_id`),
  UNIQUE KEY `id_UNIQUE` (`id`) /*!80000 INVISIBLE */,
  KEY `fk_player_role_players1_idx` (`player_id`),
  CONSTRAINT `fk_player_role_players1` FOREIGN KEY (`player_id`) REFERENCES `players` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_role`
--

LOCK TABLES `player_role` WRITE;
/*!40000 ALTER TABLE `player_role` DISABLE KEYS */;
INSERT INTO `player_role` VALUES (1,17,'ADMIN'),(3,17,'USER'),(18,1,'USER'),(24,55,'USER'),(25,56,'USER'),(26,57,'USER'),(27,58,'USER'),(31,61,'USER'),(32,62,'USER'),(33,63,'USER'),(34,64,'USER');
/*!40000 ALTER TABLE `player_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `players` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `birth_date` datetime NOT NULL,
  `experience_year` int(11) DEFAULT NULL,
  `leading_hand` enum('Left','Right') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (1,'protasov1','$2a$10$DuUKX//vZOny.Doa.Mf3Ieay27sccOz.baedy3PLQw.9.ImTu4sWm','Протасов','Владислав','1980-01-17 00:03:00',1981,'Right'),(17,'login17','$2a$10$yMeXFToPOmgz0qKfVQTF3.JgWw7ccE7.orVwsCuxhvc6uX6oAGKOC','Kibko','Aleksandra','1999-01-17 00:03:00',2008,'Right'),(55,'varvashenya88','$2a$10$f5GvCtx3tLi2kxC1FfZ7N.O4VXq8HblwFElYDrazmToETxx43s8pi','Варвашеня','Максим','1988-01-01 00:01:00',2008,'Left'),(56,'vasylchenko58','$2a$10$pudO2FznqiXiHlXi59f17OZwQeeg6sE4/pO9rbki/f8DU6RxrLUVO','Васильченко','Алексей','1958-01-01 00:01:00',1986,'Right'),(57,'vasylchenko81','$2a$10$.mhDLJxqpyr7wZNiTNOFqeKvZTmNq3N43jdG5N9XtBiFcQasHZz2C','Васильченко','Андрей','1981-01-01 00:01:00',2010,'Right'),(58,'drozdov74','$2a$10$FlplBXY9FCdJe7IyonA7xe57anqBWd0OkaX0m.oiP1u9wBnVl58tS','Дроздов','Влад','1974-01-01 00:01:00',2013,'Right'),(61,'zuikov81','$2a$10$43EYpEfJ4AeQdJDUwCq3PejXkgancID4WJay4/fkRMIo1ik5Nzts2','Зуйков','Александр','1981-01-01 00:01:00',2011,'Right'),(62,'malikov85','$2a$10$rVB0qkZeIiGEW5ad/6L/Eu4pn1D9NZJENzps1H4AcxJ0ArAzasn.6','Маликов','Павел','1985-01-01 00:01:00',2000,'Left'),(63,'logiiko90','$2a$10$w3GInma65hlE1Wv5ib2Cfu5VvCFtD4JMu5mO1Y8EF8Q2cbFR0O8C6','Логийко','Игорь','1990-01-01 00:01:00',2015,'Right'),(64,'giba66','$2a$10$yIXT/mLOcaelXLSgddQfhOvuAfLgJd21SkzCAywAgJZqvTI/yv3.O','Гиба','Владимир','1966-01-01 00:01:00',2002,'Right');
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournaments`
--

DROP TABLE IF EXISTS `tournaments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tournaments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `information` varchar(45) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournaments`
--

LOCK TABLES `tournaments` WRITE;
/*!40000 ALTER TABLE `tournaments` DISABLE KEYS */;
INSERT INTO `tournaments` VALUES (1,'Зимняя Пирамида, высшая лига','upadte upadte ','2018-01-01 00:09:00','2019-01-31 00:05:00'),(2,'test','cvbcbv ',NULL,NULL),(11,'Empty Test','empty tournament',NULL,NULL),(15,'Битва титанов','???????','1001-01-01 00:01:00','9999-01-09 00:09:00');
/*!40000 ALTER TABLE `tournaments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-15  2:50:07
