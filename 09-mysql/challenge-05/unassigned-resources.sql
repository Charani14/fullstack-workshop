SELECT 
    id,
    name,
    department
FROM
    revature.employees
LEFT JOIN
    revature.assignments a ON revature.employees.id=a.employee_id
WHERE
    a.project_id IS NULL
ORDER BY
    department, name;