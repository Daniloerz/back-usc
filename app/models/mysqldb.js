const mysql = require('mysql2')
const config = require('../config/config')

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