DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;
USE employees_DB;

CREATE TABLE employee(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id VARCHAR(20),
  manager_id INTEGER,
  PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("JOEY", "DAVIDSON", 1, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("TOM", "NOSDIVAD", 2, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("MIKE", "HUGHES", 3, 5);

SELECT * FROM employee;