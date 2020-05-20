const fs = require('fs')
const vm = require('vm')

function createTemplate(path) {
  const fileContent = fs.readFileSync(path,'utf-8')
  return vm.runInNewContext(
      `(function(data){
          with(data) {
            return \`${fileContent}\`
          }
       })`
    )
}

module.exports = createTemplate
