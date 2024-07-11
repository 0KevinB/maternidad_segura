-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sistema_medico
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actividad_fisica`
--

DROP TABLE IF EXISTS `actividad_fisica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividad_fisica` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `actividad_fisica` tinyint(1) DEFAULT NULL,
  `frecuencia_actividad` varchar(50) DEFAULT NULL,
  `tiempo_actividad` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `actividad_fisica_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividad_fisica`
--

LOCK TABLES `actividad_fisica` WRITE;
/*!40000 ALTER TABLE `actividad_fisica` DISABLE KEYS */;
INSERT INTO `actividad_fisica` VALUES (1,1,1,'Semanal','30 minutos');
/*!40000 ALTER TABLE `actividad_fisica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `antecedentes_obstetricos`
--

DROP TABLE IF EXISTS `antecedentes_obstetricos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `antecedentes_obstetricos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `embarazos_previos` int DEFAULT NULL,
  `preeclampsia` tinyint(1) DEFAULT NULL,
  `parto_prematuro` tinyint(1) DEFAULT NULL,
  `hemorragias` tinyint(1) DEFAULT NULL,
  `perdida` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `antecedentes_obstetricos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `antecedentes_obstetricos`
--

LOCK TABLES `antecedentes_obstetricos` WRITE;
/*!40000 ALTER TABLE `antecedentes_obstetricos` DISABLE KEYS */;
INSERT INTO `antecedentes_obstetricos` VALUES (1,1,2,0,1,0,1);
/*!40000 ALTER TABLE `antecedentes_obstetricos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datos_medicos`
--

DROP TABLE IF EXISTS `datos_medicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datos_medicos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `alguna_medicacion` tinyint(1) DEFAULT NULL,
  `altura` decimal(5,2) DEFAULT NULL,
  `peso` decimal(5,2) DEFAULT NULL,
  `hipertiroidismo` tinyint(1) DEFAULT NULL,
  `hipotiroidismo` tinyint(1) DEFAULT NULL,
  `hipertension` tinyint(1) DEFAULT NULL,
  `asma` tinyint(1) DEFAULT NULL,
  `cancer` tinyint(1) DEFAULT NULL,
  `ETS` tinyint(1) DEFAULT NULL,
  `ansiedad` tinyint(1) DEFAULT NULL,
  `depresion` tinyint(1) DEFAULT NULL,
  `diabetes` tinyint(1) DEFAULT NULL,
  `enfermedad_cardiaca` tinyint(1) DEFAULT NULL,
  `enfermedad_renal` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `datos_medicos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datos_medicos`
--

LOCK TABLES `datos_medicos` WRITE;
/*!40000 ALTER TABLE `datos_medicos` DISABLE KEYS */;
INSERT INTO `datos_medicos` VALUES (1,1,0,165.50,68.00,0,0,1,0,0,0,1,0,0,0,0);
/*!40000 ALTER TABLE `datos_medicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `embarazo_actual`
--

DROP TABLE IF EXISTS `embarazo_actual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `embarazo_actual` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `enfermedad_actual` varchar(255) DEFAULT NULL,
  `bajo_liquido_amniotico` tinyint(1) DEFAULT NULL,
  `alto_liquido_amniotico` tinyint(1) DEFAULT NULL,
  `anomalia_fetal` tinyint(1) DEFAULT NULL,
  `crecimiento_disminuido` tinyint(1) DEFAULT NULL,
  `in_vitro` tinyint(1) DEFAULT NULL,
  `gestacion_multiple` tinyint(1) DEFAULT NULL,
  `semanas_embarazo` int DEFAULT NULL,
  `numero_fetos` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `embarazo_actual_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `embarazo_actual`
--

LOCK TABLES `embarazo_actual` WRITE;
/*!40000 ALTER TABLE `embarazo_actual` DISABLE KEYS */;
INSERT INTO `embarazo_actual` VALUES (1,1,'Ninguna',0,0,0,0,0,0,20,1);
/*!40000 ALTER TABLE `embarazo_actual` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitos`
--

DROP TABLE IF EXISTS `habitos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `bebidas_alcoholicas` tinyint(1) DEFAULT NULL,
  `tipo_alcohol` varchar(255) DEFAULT NULL,
  `frecuencia_alcohol` varchar(50) DEFAULT NULL,
  `drogas` tinyint(1) DEFAULT NULL,
  `tipo_droga` varchar(255) DEFAULT NULL,
  `frecuencia_droga` varchar(50) DEFAULT NULL,
  `tabaco` tinyint(1) DEFAULT NULL,
  `frecuencia_tabaco` varchar(50) DEFAULT NULL,
  `hogar_libre_tabaco` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `habitos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitos`
--

LOCK TABLES `habitos` WRITE;
/*!40000 ALTER TABLE `habitos` DISABLE KEYS */;
INSERT INTO `habitos` VALUES (1,1,1,'Cerveza','Semanal',0,'','',1,'Diario',0);
/*!40000 ALTER TABLE `habitos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nutricion`
--

DROP TABLE IF EXISTS `nutricion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nutricion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `dieta` int NOT NULL,
  `frutas` int NOT NULL,
  `verduras` int NOT NULL,
  `carnes` int NOT NULL,
  `comida_rapida` int NOT NULL,
  `legumbres` int NOT NULL,
  `mariscos` int NOT NULL,
  `lacteos` int NOT NULL,
  `numero_comidas` int NOT NULL,
  `numero_vasos` int NOT NULL,
  `comidas_fuera_casa` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nutricion_ibfk_1` (`usuario_id`),
  CONSTRAINT `nutricion_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nutricion`
--

LOCK TABLES `nutricion` WRITE;
/*!40000 ALTER TABLE `nutricion` DISABLE KEYS */;
INSERT INTO `nutricion` VALUES (1,1,1,3,4,2,1,3,1,2,3,0,0),(3,1,0,3,4,2,1,3,1,2,3,0,0);
/*!40000 ALTER TABLE `nutricion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resultados`
--

DROP TABLE IF EXISTS `resultados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resultados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `resultados_salud` float NOT NULL,
  `resultados_habitos` float NOT NULL,
  `resultados_actividad_fisica` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `resultados_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resultados`
--

LOCK TABLES `resultados` WRITE;
/*!40000 ALTER TABLE `resultados` DISABLE KEYS */;
/*!40000 ALTER TABLE `resultados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contraseña` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `telefono` varchar(45) NOT NULL,
  `rol` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Juan','Perez','juan.perez@example.com','$2b$10$pROt/nrKLQznxXbvKylSCOMV0FVSaUHQrX1CPGxwkYqpqJOtD.0MG','1990-01-01','',1),(2,'sfasf','afaf','sdfsds','$2b$10$3NnD1yOoZLo2UgHHBlX9veQ3RZVeMgoXbR3q5kcjR0RoccyCD63Hi','2004-01-01','209424',1),(3,'carolina','alvarado','carolalvarado@gmail.com','$2b$10$p8EfPv0I8wOwMdpMVlJjVebk53Zwipzy2mwe0AWphlRmjLbus4ovK','2004-01-01','09918313',1);
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

-- Dump completed on 2024-07-10  0:54:19
