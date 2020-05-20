const koa = require('koa')
const mount = require('koa-mount')
const static = require('koa-static')
const { renderToString } = require('react-dom/server')
const getData = require('./get-data.js')
const template = require('./template')(__dirname + '/index.htm')


require('@babel/register')({
  presets: ['@babel/preset-react']
})
const App = require('./app.jsx')
const app = new koa()
app.use(
  mount('/static',static(__dirname+'/source/')),
)
app.use(
  mount('/data',async (ctx) => {
    ctx.body = await getData({sortType:0,filtType:0,...ctx.query})
  })
);
app.use(
  mount('/', async (ctx) => {
    const data = await getData({sortType:0,filtType:0,...ctx.query})
    ctx.body = template({
      reactString: renderToString(App(data)),
      reactData:data,
      sortType:ctx.query.sortType || 0,
      filtType:ctx.query.filtType || 0
    })
  })
)

// app.listen(3000)

module.exports = app
