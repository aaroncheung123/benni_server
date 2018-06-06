var Todos = require('../models/todoModel');

module.exports = function(app){
  app.get('/api/setupTodos', function(req,res){
    //seed database
    var starterTodos = [
      {
          username: 't1',
          password: '123',
          info: 'This is a test'
      }
    ];

    Todos.create(starterTodos, function(err, results){
      res.send(results);
    });
  });
}
