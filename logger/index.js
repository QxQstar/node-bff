const log4js = require('koa-log4')
const logconfig = require('./config.js')

log4js.configure(logconfig)
exports.accessLogger = () => {
  return log4js.koaLogger(log4js.getLogger('access'),{ level: 'info' });
}
exports.logger = log4js.getLogger('error');
