const fs = require('fs')
const vm = require('vm')

const context = {
    include:function (name, data) {
        const tpl = template(name)
        return tpl(data)
    }
}

function template(path) {
    const tpl = fs.readFileSync(path,'utf-8')
    return vm.runInNewContext(
      `(function (data) {
        with(data) {
            return \`${tpl}\`
        }
      })`,
      context
    )
}

module.exports = template
