var userData = require('../models/userDataModel');

module.exports = function(app){
  app.get('/api/setupUserData', function(req,res){
    //seed database
    var starterUserData = [
      {
          username: 't1',
          password: '123',
          info: 'This is a test'
      }
    ];

    userData.create(starterUserData, function(err, results){
      res.send(results);
    });
  });
}
