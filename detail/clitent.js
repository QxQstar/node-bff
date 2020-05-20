const EasySock = require('easy_sock')
const protobuf = require('protocol-buffers')
const fs = require('fs')

function createSocket() {
  const socket = new EasySock()
  socket.setConfig({
    ip : "127.0.0.1",
    port : 4000,
    keepAlive : false,
    timeout : 5000
  });

  socket.isReceiveComplete = function (packet) {
    if(packet.length < 8) {
      return 0
    }

    const bodyLength = packet.readInt32BE(4)

    if(packet.length >=  bodyLength + 8) {
      return bodyLength + 8
    } else {
      return 0
    }
  }

  socket.encode = function (data,seq) {
    const proto = protobuf(fs.readFileSync( __dirname + '/detail.proto' ))
    const body = proto.ColumnRequest.encode(data)
    const head = Buffer.alloc(8)
    head.writeInt32BE(seq)
    head.writeInt32BE(body.length, 4)
    return Buffer.concat([head,body])
  }

  socket.decode = function (packet) {
    const proto = protobuf(fs.readFileSync( __dirname + '/detail.proto' ))

    const seq = packet.slice(0,4).readInt32BE()
    const result = proto.ColumnResponse.decode(packet.slice(8))
    return {
      seq,
      result
    }
  }

  return socket
}

socket = createSocket();

module.exports = socket

