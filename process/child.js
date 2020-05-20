console.log(process.argv,'child')

process.on('message',(msg) => {
  console.log(msg)

  process.send('i am ready')
})
