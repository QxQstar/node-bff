const clientRPC = require('./clitent.js')
const mount = require('koa-mount');
const static = require('koa-static')
const koa = require('koa')
const template = require('./template/index')
const app = new koa()

const tpl = template(__dirname+'/template/index.html')
app.use(mount('/static', static(`${__dirname}/source/static/`)))
app.use(
  mount('/',  async (ctx) => {
    const columnid = ctx.query.columnid

    if(!columnid) {

      ctx.status = 500
      ctx.body = 'columnid 不能为空 '
    }

    const result = await new Promise((resolve, reject) => {
      clientRPC.write({columnid:columnid},function (error, data) {
        error ? reject(error) : resolve(data)
      })
    })

    ctx.status = 200
    ctx.body = tpl(result)

  })
)

// app.listen(3100)

module.exports = app


