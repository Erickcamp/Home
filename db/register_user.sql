INSERT INTO users
(username, password, email, first_name, last_name)
VALUES
($1, $2, $3, $4, $5);

select * from users
where username = $1;