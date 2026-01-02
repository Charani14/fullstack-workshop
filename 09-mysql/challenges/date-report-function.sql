DELIMITER //

CREATE FUNCTION GetProjectStatus(project_id INT)
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
    DECLARE proj_start DATE;
    DECLARE proj_end DATE;
    DECLARE status VARCHAR(20);

    SELECT start_date, end_date
    INTO proj_start, proj_end
    FROM revature.projects
    WHERE id = project_id;
    
    IF proj_start IS NULL THEN
        SET status = 'Unknown';

    ELSEIF CURDATE() < proj_start THEN
        SET status = 'Not Started';

    ELSEIF CURDATE() BETWEEN proj_start AND proj_end THEN
        SET status = 'In Progress';

    ELSEIF CURDATE() > proj_end THEN
        SET status = 'Completed';

    ELSE
        SET status = 'Unknown';
    END IF;

    RETURN status;
END//

DELIMITER ;
SELECT 
    p.name,
    p.start_date,
    p.end_date,
    GetProjectStatus(p.id) AS status
FROM revature.projects p;
