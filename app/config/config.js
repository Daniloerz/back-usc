require('dotenv').config()

module.exports = {
  DB: process.env.DB,
  HOST: process.env.HOST,
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  PORT: process.env.PORT,
  DIALECT: process.env.DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
/*
module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  DIALECT: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
*/
