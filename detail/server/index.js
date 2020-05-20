const net = require('net')
const protobuf = require('protocol-buffers')
const fs = require('fs')
const path = require('path')
const column = require('./column')

const server = net.createServer((socket) => {
  socket.on('data',(data) => {
    const proto = protobuf(fs.readFileSync( path.resolve(__dirname,'../detail.proto') ))
    // 得到请求参数
    const requestBody = data.slice(8)
    const query = proto.ColumnRequest.decode(requestBody)
    console.log(query)

    const body = proto.ColumnResponse.encode(
      {
        column:column[0],
        recommendColumns:[column[1],column[2]]
      }
    )
    const head = Buffer.alloc(8)
    // 序号
    head.writeInt32BE(data.readInt32BE())
    head.writeInt32BE(body.length,4)

    socket.write(Buffer.concat([head,body]))
  })
})

server.listen(4000)
