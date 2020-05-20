const userModel = require('../model/userModel')

exports.createUser = function(data) {
  return userModel.create(data)
    .then(result => {
      console.log(result,'result')
      return result;
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getUser = function () {
  return userModel.findAll()
}

