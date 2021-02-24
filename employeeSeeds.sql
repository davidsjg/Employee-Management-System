DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;
USE employees_DB;



CREATE TABLE employee(
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    -- foreign key - pointer to something in another table --
    role_id VARCHAR(20),
    manager_id INTEGER,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary INTEGER,
    -- foreign key - pointer to something in another table --
    department_id INTEGER(11),
	PRIMARY KEY (id)
);

CREATE TABLE department (
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
    department VARCHAR (50),
	PRIMARY KEY (id)
);

INSERT INTO department (department) VALUES ("Sales");
INSERT INTO department (department) VALUES ("Legal");
INSERT INTO department (department) VALUES ("Finance");

INSERT INTO roles (title, salary, department_id) VALUES ("Sales Lead", 150000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("Salesperson", 100000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("Accountant", 50000, 3);

INSERT INTO employee (first_name, last_name, role_id) VALUES ("JOE", "SAKIC", 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("ADAM", "DEADMARSH", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("PETER", "FORSBERG", 3, 1);

SELECT * FROM employee;
SELECT * FROM roles;
SELECT * FROM department;

SELECT title, department, salary
FROM roles 
INNER JOIN department ON roles.department_id = department.id;

-- INNER JOIN employee --> cant do that bc SELECT (table header) not correct


SELECT employee.id, employee.first_name, employee.last_name, title, department, salary, employee.manager_id, CONCAT(manager.first_name, " ", manager.last_name) as manager
FROM roles
INNER JOIN department ON roles.department_id = department.id
INNER JOIN employee ON employee.role_id = roles.id
LEFT JOIN employee manager ON manager.id = employee.manager_id;


