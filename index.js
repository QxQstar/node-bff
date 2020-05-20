const cluster = require('cluster')
const path = require('path')

const forkWork = () => {
  const worker = cluster.fork()
  let num = 0
  const timer = setInterval(() => {
    // 心跳 3 次没有回应，将杀之
    if(num >= 3) {
      // process.kill(worker.process.pid);
      worker.kill()
      clearInterval(timer)
      return
    }
    worker.send('ping#'+worker.process.pid)
    num ++
  },3000)

  worker.on('message',(msg) => {
    if(msg === 'pong#'+worker.process.pid) {
      num--
    }
  })
  // 当有工作进程退出，5 秒钟之后重启一个工作进程
  worker.on('exit',() => {
    clearInterval(timer)
    setTimeout(() => {
      forkWork()
    },5000)
  })
}

if(cluster.isMaster) {
  for(let i = 0; i < 3; i++){
    forkWork()
  }
} else {
  require( path.join(__dirname + '/app.js') )
  process.on('uncaughtException',(err) => {
    // 在这里可以将错误信息保存到日志中
    progress.exit(1)
  })

  process.on('message',(msg) => {
    if(msg === 'ping#'+process.pid) {
      process.send('pong#'+process.pid)
    }
  })
  // 隔 5 秒钟监测一个内存使用情况
   let timer = setInterval(() => {
    if(process.memoryUsage().rss > 419430400) {
      clearInterval(timer)
      process.exit()
    }
  },5000)
}
