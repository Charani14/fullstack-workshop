DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `AdjustDepartmentSalary`(
    IN dept VARCHAR(50),
    IN percent DECIMAL(5,2),
    OUT affected_count INT
)
BEGIN
    IF percent < 0 THEN
        SET affected_count = 0;
    ELSE
        SELECT COUNT(*)
        INTO affected_count
        FROM employees
        WHERE department = dept;
    END IF;
END       
DELIMITER ;
CALL AdjustDepartmentSalary('Sales', 10.00, @count);
SELECT @count AS affected_employees;
CALL AdjustDepartmentSalary('Engineering', -5.00, @count);
SELECT @count AS affected_employees;