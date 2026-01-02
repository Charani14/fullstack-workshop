DELIMITER //
CREATE PROCEDURE GetBudgetUtilization()
BEGIN
    SELECT 
        p.name AS project_name,
        p.budget,
        SUM(e.salary * a.hours_allocated / 2080) AS salary_cost,
        (p.budget - SUM(e.salary * a.hours_allocated / 2080)) AS remaining,
        (SUM(e.salary * a.hours_allocated / 2080) / p.budget) * 100 AS utilization_pct
    FROM 
        revature.projects p
    JOIN 
        revature.assignments a ON p.id = a.project_id
    JOIN 
        revature.employees e ON a.employee_id = e.id
    GROUP BY    
        p.id, p.name, p.budget
    ORDER BY 
        utilization_pct DESC;
END//
DELIMITER ;
CALL GetBudgetUtilization();