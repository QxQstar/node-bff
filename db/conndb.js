const basebaseConfig = require('./../config/database-config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(basebaseConfig.databaseName, basebaseConfig.userName, basebaseConfig.password, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
module.exports = sequelize
