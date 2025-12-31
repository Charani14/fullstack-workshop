DELIMITER //
CREATE FUNCTION GetTenureCategory(hire_date Date)
RETURNS VARCHAR(30)
DETERMINISTIC
BEGIN
    DECLARE exp INT;
    DECLARE tenure_category VARCHAR(30);   
    SET exp = TIMESTAMPDIFF(YEAR, hire_date, CURDATE());
    IF exp>5 THEN
        SET tenure_category='Veteran';
    ELSEIF exp>=2 AND exp<=5 THEN
        SET tenure_category='Experienced';
    ELSE
        SET tenure_category='New Hire';
    END IF;
    RETURN tenure_category;
    END//
DELIMITER ;

SELECT 
    name,
    hire_date,
    GetTenureCategory(hire_date) as tenure_category
FROM
    revature.employees;