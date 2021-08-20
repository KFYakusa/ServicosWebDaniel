const createConnectionPool  = require("@databases/pg")
const db = createConnectionPool(
    `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
);
module.exports = db

/**
 
{
    "env":{
        "PORT":,
        "DB_USER":"",
        "DB_PASSWORD":"",
        "DB_HOST":"",
        "DB_PORT":,
        "DB_DATABASE":"",
        "JWT_KEY": ""
    }
}
 * 
 * **********************************************
 *  ABAIXO CÓDIGO PRA CRIAÇÃO DAS TABELAS DO BANCO  
 * **********************************************
 **/
/*

! DROP TABLE users;
! DROP TABLE roles;
? create table roles (
?	id SERIAL PRIMARY KEY,
?	role_name varchar(20) not null
? );

? create table users (
?	id SERIAL PRIMARY KEY,
?	user_role INT NOT NULL,
?	user_email varchar(50) UNIQUE not null,
?	user_name varchar(50) not null,
?	user_password varchar(100) NOT NULL,
?	CONSTRAINT fk_role FOREIGN KEY(user_role) REFERENCES roles(id)
? );
? 
* INSERT INTO roles(role_name) VALUES('admin'), ('customer');
? 
? 
* INSERT INTO users(user_role,user_email,user_name,user_password) VALUES(1,'test@teste.com','testeName','password');

* SELECT user_email,role_name,user_name FROM users INNER JOIN roles ON user_role=roles.id WHERE user_email='test@teste.com';
 -- INSERT INTO users(user_role,user_email,user_name,user_password) VALUES(1,'test@teste.com','testeName','password');
 -- ','',''); DROP DATABASE;
 -- '; SELECT * FROM sysobjects ;--


*/