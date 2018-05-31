var configValues = require('./config');
module.exports = {
  getDbConnectionString: function(){
    return 'mongodb://' + configValues.username + ':' + configValues.password + '@ds141320.mlab.com:41320/nelli_db';
  }
}
