const EasySock = require('easy_sock')
const fs = require('fs')
const protobuf = require('protocol-buffers')

const message =  protobuf(fs.readFileSync(__dirname + '/list.proto','utf-8'))

const easysock = new EasySock();
easysock.setConfig({
  ip : "127.0.0.1",
  port : 4003,
  keepAlive : false,
  timeout : 500
});

easysock.isReceiveComplete = function (packet) {
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

easysock.decode = function (packet) {
  const body = message.ListResponse.decode(packet.slice(8))

  return {
    result:body,
    seq:packet.readInt32BE()
  }
}
easysock.encode = function (data, seq) {
  const body = message.ListRequest.encode(data)
  const head = Buffer.alloc(8)
  head.writeInt32BE(seq)
  head.writeInt32BE(body.length,4)

  return Buffer.concat([head,body])
}

module.exports = easysock
