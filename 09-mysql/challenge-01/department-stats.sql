SELECT 
    e.department,
    COUNT(e.id) AS employee_count,
    ROUND(AVG(e.salary), 2) AS avg_salary,
    MAX(e.salary) AS max_salary
FROM employees e
GROUP BY e.department
HAVING COUNT(e.id) > 2;