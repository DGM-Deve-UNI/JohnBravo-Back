-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: johnbravo
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `johnbravo`
--

/*!40000 DROP DATABASE IF EXISTS `johnbravo`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `johnbravo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `johnbravo`;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id_users` int(11) NOT NULL AUTO_INCREMENT,
  `nome_user` varchar(45) NOT NULL,
  `sobrenome_user` varchar(45) NOT NULL,
  `data_nasc_user` date NOT NULL,
  `gen_user` varchar(15) NOT NULL,
  `cpf_user` varchar(14) NOT NULL,
  `email_user` varchar(110) NOT NULL,
  `cel_user` varchar(15) NOT NULL,
  `tel_user` varchar(15) NOT NULL,
  `cep_user` varchar(9) NOT NULL,
  `endereco_user` varchar(45) NOT NULL,
  `num_end_user` varchar(5) NOT NULL,
  `estado_user` varchar(45) NOT NULL,
  `cidade_user` varchar(45) NOT NULL,
  `bairro_user` varchar(45) NOT NULL,
  `complemento_user` varchar(200) NOT NULL,
  `login_user` varchar(8) NOT NULL,
  `senha_user` varchar(100) NOT NULL,
  PRIMARY KEY (`id_users`),
  UNIQUE KEY `cpf_user` (`cpf_user`),
  UNIQUE KEY `email_user` (`email_user`),
  UNIQUE KEY `login_user` (`login_user`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabela de cadastro de usuários.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (27,'Luna','Alves','1999-12-12','Feminino','123.456.789-09','luna@gmail.com','(21) 91234-5678','','22240-000','Rua das Laranjeiras','365','RJ','Rio de Janeiro','Laranjeiras','','luna1234','$2y$10$CVestyCIgk6aBWhIwjOHuOKazDB0VLhGUbyZghURhKjlvhh9g7kim'),(28,'Lucas','Lima','1999-12-12','Masculino','049.996.453-51','lucas@gmail.com','(11) 11111-1111','','20911-300','Rua Leopoldo Bulhões','987','RJ','Rio de Janeiro','Manguinhos','','lucas123','$2y$10$/EHsTaNzWfN5umqsACSN/OPvO61hxl01ouMluNr2JT79RnkClFdnK');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-18 14:53:02
