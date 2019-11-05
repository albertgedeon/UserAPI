CREATE PROCEDURE `create_user` (IN first_name VARCHAR(64), IN last_name VARCHAR(64), IN email VARCHAR(256), IN password VARCHAR(256), IN role_id BINARY(16), out newUserUUID BINARY(16))
BEGIN
	DECLARE newUserUUID BINARY(16) DEFAULT 0;
    SET newUserUUID = Users.ordered_uuid();
	INSERT INTO Users.Users (id, first_name, last_name, email, password, role_id) VALUES (newUserUUID, first_name, last_name, email, password, role_id);
END