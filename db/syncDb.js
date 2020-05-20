// 换电脑时，执行node pub/utils/syncDb.js同步表结构
// 数据库表结构转模型：cd pub && sequelize-auto -h localhost -d node_server_dev -u root -x BYGMJXLy18 -p 3306 -t fecms_config_detail_version
const sequelize = require('./conndb')
var path = require('path');

//读取所有模块文件
var fs = require('fs');
var files = fs.readdirSync(path.join(__dirname, '../model'));
var js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);

//sequelize模块化每个文件（模块内部使用sequelize初始化了，会自动关联到sequelize实例）
var models = {};
for (var f of js_files) {
    console.log(`import model from file ${f}...`);
    var name = f.substring(0, f.length - 3);
    models[name] = require(path.join(__dirname, '../model/' + f));
}
module.exports = models;

console.log(models)


sequelize.sync({
  // force: true  //会执行DROP TABLE先
}).then(() => {
  console.log(`* * * * * * * * All Models synced Successfull * * * * * * * *`);
}).catch(error => {
  console.log(`Models synced Error: ${error}`);
});
