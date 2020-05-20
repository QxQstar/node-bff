const koa = require('koa')
const mount = require('koa-mount')
const static = require('koa-static')
const fs = require('fs')

const app = new koa()
app.use(
  mount('/static',static(__dirname+'/source/static/'))
)

const  buffer = fs.readFileSync(__dirname + '/source/index.htm')
const arr = []
app.use(
  mount('/',async (ctx) => {
    ctx.status = 200
    ctx.type = 'html'
    const html = fs.readFileSync(__dirname + '/source/index.htm','utf-8')
    ctx.body = html

    // arr.push(html)
  })
)
// app.listen(3000)

module.exports = app
