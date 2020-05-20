const fs = require('fs')
const { buildSchema } = require('graphql');
const listRpc = require('./client-rpc/list-rpc')
const parseRpc = require('./client-rpc/parse-rpc')


exports.schema = buildSchema( fs.readFileSync(__dirname+'/schema/comment.gql','utf-8') )
exports.rootValue = {
  comment:({id}) => {
    return new Promise((resolve, reject) => {
      listRpc.write({columnid:id},function (error, data) {
        if(error) reject(error)
        else resolve(data.comments)
      })
    })
  },
  praise:({id}) => {
    return new Promise((resolve, reject) => {
      parseRpc.write({commentid:id},function (error, data) {

        if(error) reject(error)
        else resolve(data.praiseNum)
      })
    })
  }
}
