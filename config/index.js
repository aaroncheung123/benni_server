var configValues = require('./config');
module.exports = {
  getDbConnectionString: function(){
    return 'mongodb://' + configValues.username + ':' + configValues.password + '@ds259070.mlab.com:59070/benni_db1';
  }
}
