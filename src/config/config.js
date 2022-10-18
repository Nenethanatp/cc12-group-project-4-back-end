require('dotenv').config();
const { DATABASE_PASSWORD } = process.env;
module.exports = {
  development: {
    username: 'root',
    password: DATABASE_PASSWORD,
<<<<<<< HEAD
    database: 'database_development',
=======
    database: 'database_cc12_group4',
>>>>>>> develop
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};
