module.exports = {
  appenders:{
    out: {
      type: 'console'
    },
    error:{
      type:'dateFile',
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      filename:  'logs/error',

    },
    access:{
      type:'dateFile',
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      filename:  'logs/access'
    }
  },
  categories:{
    default: { appenders: [ 'out' ], level: 'all' },
    error:{
      appenders: [ 'error' ], level: 'error'
    },
    access:{
      appenders: [ 'access' ], level: 'info'
    }
  },
  disableClustering: true
}
