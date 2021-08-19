const createConnectionPool  = require("@databases/pg")
const db = createConnectionPool(
    `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
);
module.exports = db

/**
 * 
 * {
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
 * 
 * 
 * 
 * 
 */


