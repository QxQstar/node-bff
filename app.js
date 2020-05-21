const koa = require('koa')
const mount = require('koa-mount')
const url = require('url')
const detail = require('./detail/index')
const download = require('./download/index')
const list = require('./list/node/index')
const play = require('./play/index')
// const user = require('./user/index')
const { accessLogger,logger } = require('./logger/index')
const onerror = require('koa-onerror');

const app = new koa()
onerror(app)
app.use(accessLogger())
app.use(async (ctx,next) => {
  const parsedUrl = url.parse(ctx.url);
  if (
    (parsedUrl.pathname === '/download') ||
    (parsedUrl.pathname === '/detail') ||
    (parsedUrl.pathname === '/play') ||
    (parsedUrl.pathname === '/list') ||
    (parsedUrl.pathname === '/user')
  ) {
    parsedUrl.pathname = parsedUrl.pathname + '/'
    ctx.redirect(url.format(parsedUrl));
    return
  }

  await next()
})

app.use(
  mount('/download',download),
)

app.use(
  mount('/list',list)
)

app.use(
  mount('/play',play)
)

app.use(
  mount('/detail',detail)
)
// app.use(
//   mount('/user',user)
// )
app.use(
  mount('/',(ctx) => {
    ctx.redirect('/list/')
  })
)

app.listen(3000,() => {
  console.log('listen 3000')
})

app.on('error',(error) => {
  logger.error(error)
})
