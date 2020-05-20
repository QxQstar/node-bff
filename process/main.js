const { fork } = require('child_process')

const child_process = fork(__dirname+'/child.js',['nan','1'])

child_process.send('hello child')

child_process.on('message',(msg) => {
  console.log(msg)
})

