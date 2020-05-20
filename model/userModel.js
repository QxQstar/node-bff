const defineModel = require('../db/defineModel')
const Sequelize = require('sequelize')

module.exports = defineModel('user',{
  // attributes
  first: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last: {
    type: Sequelize.STRING
    // allowNull defaults to true
  }
})


