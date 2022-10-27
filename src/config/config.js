require('dotenv').config();
// const { DATABASE_PASSWORD } = process.env;
module.exports = {
  development: {
    username: 'doadmin',
    password: 'AVNS_t03GSbbwbASugz_sCQu',
    database: 'database_cc12_group4',
    host: 'cc12-group4-do-user-12742444-0.b.db.ondigitalocean.com',
    port: '25060',
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
