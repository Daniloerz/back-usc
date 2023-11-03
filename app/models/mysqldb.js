const mysql = require('mysql2')
const config = require('../config/config')

const connection = mysql.createConnection(config.DATABASE_URL, config.PORT)
console.log('Conectado')

connection.connect((error) => {
    if (error) {
      console.error('Error conectandose a la bd:', error);
    } else {
      console.log('Conectado a la bd');
    }
});

module.exports = connection;