const koa = require('koa')
const mount = require('koa-mount')
const userControl = require('../control/userControl')
const url = require('url')

const app = new koa()

app.use(
  mount('/list',async (ctx) => {
    try {
      const list = await userControl.getUser()
      ctx.status = 200
      ctx.body = list
    } catch (e) {
      ctx.body = e;
      ctx.type = 'html'
      ctx.status = 500
    }
  })
)

app.use(
  mount('/',async (ctx) => {
    const { last,first } = ctx.query
    try {
      await userControl.createUser({first,last})
      ctx.status = 200
      ctx.body = '创建成功'
    } catch (e) {
      ctx.body = e;
      ctx.type = 'html'
      ctx.status = 500
    }
  })
)



module.exports = app
