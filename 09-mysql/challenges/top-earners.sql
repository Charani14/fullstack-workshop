WITH ranked_employees AS (
    SELECT 
        department,
        name,
        salary,
        ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rank_in_dept
    FROM revature.employees
)
SELECT
    department,
    name,
    salary,
    rank_in_dept
FROM ranked_employees
WHERE rank_in_dept <= 3
ORDER BY department, rank_in_dept;


