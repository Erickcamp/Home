create table users(
id serial primary key,
email VARCHAR(50),
password varchar(100),
first_name varchar(30),
last_name VARCHAR(30),
username varchar(20)
);

create table posts(
id serial primary key,
title varchar(25),
img text,
content varchar(200),
author_id integer REFERENCES users(id)
);

create table messages(
id serial primary key,
messages varchar(200),
time TIMESTAMP,
user_id integer REFERENCES users(id)
);