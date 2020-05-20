const sequelize = require('./conndb')

module.exports = function defineModel(name,attr,option) {
  const model = sequelize.define(name,attr,option)

  return model
}
