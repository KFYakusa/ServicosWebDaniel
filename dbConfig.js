const createConnectionPool  = require("@databases/pg")
const db = createConnectionPool(
    `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
);
module.exports = db