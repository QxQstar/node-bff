const EasySock = require('easy_sock')
const protobuf = require('protocol-buffers')
const fs = require('fs')
const path = require('path')

function createRpc() {
  const socket = new EasySock()
  socket.setConfig({
    ip : "127.0.0.1",
    port : 4001,
    keepAlive : false,
    timeout : 5000
  });
  socket.isReceiveComplete = function (packet) {
    if(packet.length < 8) {
      return 0
    }
    const bodyLength = packet.readInt32BE(4)

    if(packet.length >= bodyLength + 8) {
      return bodyLength + 8
    } else {
      return 0
    }
  }
  socket.decode = function (packet) {
    const seq = packet.readInt32BE()
    const bodyBuffer = packet.slice(8)
    const pathname = path.join(__dirname,'../schema/comment.proto')
    const message = protobuf(fs.readFileSync(pathname,'utf-8'))

    const result = message.CommentListResponse.decode(bodyBuffer)

    return {
      seq,
      result
    }
  }
  socket.encode = function (data, seq) {
    const pathname = path.join(__dirname,'../schema/comment.proto')
    const message = protobuf(fs.readFileSync(pathname,'utf-8'))
    const body = message.CommentListRequest.encode(data)
    const head = Buffer.alloc(8)

    head.writeInt32BE(seq)
    head.writeInt32BE(body.length,4)

    return Buffer.concat([head,body])

  }
  return socket
}

module.exports = createRpc()
