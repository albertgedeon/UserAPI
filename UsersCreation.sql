-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Users
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `Users` ;

-- -----------------------------------------------------
-- Schema Users
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Users` DEFAULT CHARACTER SET utf8 ;
USE `Users` ;

-- -----------------------------------------------------
-- Table `Users`.`Departments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Users`.`Departments` (
  `id` BINARY(16) NOT NULL,
  `name` VARCHAR(64) NOT NULL,
  `description` VARCHAR(256) NULL,
  `display_order` INT UNSIGNED NOT NULL,
  `leader_id` BINARY(16) NULL,
  PRIMARY KEY (`id`, `name`),
  INDEX `fk_Departments_Users1_idx` (`leader_id` ASC),
  CONSTRAINT `fk_Departments_Users1`
    FOREIGN KEY (`leader_id`)
    REFERENCES `Users`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Users`.`Roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Users`.`Roles` (
  `id` BINARY(16) NOT NULL,
  `name` VARCHAR(64) NOT NULL,
  `description` VARCHAR(256) NULL,
  `display_order` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Users`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Users`.`Users` (
  `id` BINARY(16) NOT NULL,
  `first_name` VARCHAR(64) NOT NULL,
  `last_name` VARCHAR(64) NOT NULL,
  `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `department_id` BINARY(16) NULL,
  `role_id` BINARY(16) NOT NULL,
  `title` VARCHAR(64) NULL,
  `modified_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `password` VARCHAR(256) NOT NULL,
  `email` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`, `email`),
  INDEX `fk_Users_Departments_idx` (`department_id` ASC),
  INDEX `fk_Users_Roles1_idx` (`role_id` ASC),
  CONSTRAINT `fk_Users_Departments`
    FOREIGN KEY (`department_id`)
    REFERENCES `Users`.`Departments` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_Roles1`
    FOREIGN KEY (`role_id`)
    REFERENCES `Users`.`Roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Users`.`Role_Actions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Users`.`Role_Actions` (
  `id` BINARY(16) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL,
  `role_id` BINARY(16) NOT NULL,
  `display_order` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `name`),
  INDEX `fk_Role_Actions_Roles1_idx` (`role_id` ASC),
  CONSTRAINT `fk_Role_Actions_Roles1`
    FOREIGN KEY (`role_id`)
    REFERENCES `Users`.`Roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
