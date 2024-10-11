create database user_auth_db;
use user_auth_db;
create table users(
id INT auto_increment primary key,
username varchar(255) not null unique,
password varchar(255) not null
);
select * from users;