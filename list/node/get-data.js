const rpc = require('./list-client.js')

module.exports = function getData(param) {
  return new Promise((resolve, reject) => {
    rpc.write(param,function (error, data) {
      error ? reject(error) : resolve(data.columns)
    })
  })
}
