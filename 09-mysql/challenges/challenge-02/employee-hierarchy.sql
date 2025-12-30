CREATE DATABASE revature;
USE revature;
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    department VARCHAR(50),
    salary DECIMAL(10,2),
    hire_date DATE,
    manager_id INT
);

CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    budget DECIMAL(12,2),
    start_date DATE,
    end_date DATE
);

CREATE TABLE assignments (
    employee_id INT,
    project_id INT,
    role VARCHAR(50),
    hours_allocated INT,
    PRIMARY KEY (employee_id, project_id)
);
SELECT 
    e1.name AS employee_name,
    e2.name AS manager_name
FROM 
    revature.employees e1
LEFT JOIN 
    revature.employees e2 ON e1.manager_id = e2.id; 