SELECT 
    e.department,
    COUNT(*) AS employee_count,
    ROUND(AVG(e.salary), 2) AS avg_salary,
    MAX(e.salary) AS max_salary
FROM employees e
GROUP BY e.department
HAVING COUNT(*) > 2;