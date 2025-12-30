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
    p.name AS project_name,
    p.budget,
    COUNT(a.employee_id) AS team_size,
    SUM(a.hours_allocated) AS total_hours
FROM 
    revature.projects p
JOIN 
    revature.assignments a ON p.id = a.project_id
WHERE 
    p.budget > 50000
GROUP BY    
    p.id, p.name, p.budget
ORDER BY 
    total_hours DESC;