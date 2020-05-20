const koa = require('koa')
const koaStatic = require('koa-static')
const mount = require('koa-mount')
const fs = require('fs')
const graphqlHTTP = require('koa-graphql');
const {schema,rootValue} = require('./schema')

const app = new koa()
app.use(
  mount('/static',koaStatic(__dirname+'/source/static/')),
)
app.use(
  mount('/api',graphqlHTTP({
    schema: schema,
    rootValue:rootValue
  })))
const str = fs.readFileSync(__dirname+'/source/index.htm')
app.use(
  mount('/',async (ctx) => {
    ctx.status = 200
    ctx.type = 'html'
    ctx.body = str
  }),
)

// app.listen(3000)

module.exports = app
