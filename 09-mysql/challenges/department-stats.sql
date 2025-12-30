SELECT department,
COUNT(e.id) as employee_count,
ROUND(avg(e.salary),2) as AVG_salary,
MAX(e.salary) as max_salary
FROM revature.employees e
GROUP BY e.department
HAVING COUNT(e.id)>2;