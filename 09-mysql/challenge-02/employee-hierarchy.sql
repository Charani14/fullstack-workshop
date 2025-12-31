SELECT 
    e1.name AS employee_name,
    e2.name AS manager_name
FROM 
    revature.employees e1
LEFT JOIN 
    revature.employees e2 ON e1.manager_id = e2.id; 