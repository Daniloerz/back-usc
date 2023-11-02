const Sequelize = require('sequelize')
const config = require('../config/config.js')

const sequelize = new Sequelize(config.DB, config.USERNAME, config.PASSWORD, {
  dialect: config.DIALECT,
  port: config.PORT,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  },
  ssl: {
    rejectUnauthorized: true
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.uscclub = require("./bookModel.js")(sequelize, Sequelize);

module.exports = db;
/*
const connection = mysql.createConnection(config.DATABASE_URL, config.PORT)
console.log('Connected')

connection.connect((error) => {
    if (error) {
      console.error('Error connecting to MySQL database:', error);
    } else {
      console.log('Connected to MySQL database');
    }
});

module.exports = connection;
*/
