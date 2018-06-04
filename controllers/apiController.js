var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function(app){

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //RETRIEVE INFORMATION BY ALL
  app.get('/api/todos/:username', function(req, res){
    Todos.find({ username: req.params.username},
    function(err,todos){
      if(err) throw err;
      res.send(todos);
    });
  });

  //RETRIEVE INFORMATION BY ID
  app.get('/api/todo/:id', function(req, res){
    Todos.findById({ _id: req.params.id},
    function(err,todos){
      if(err) throw err;
      res.send(todos);
    });
  });

  //UPDATE
  app.post('/api/todo', function(req, res){
    if(req.body.id){
      Todos.findByIdAndUpdate(req.body.id,{
        todo:req.body.todo, isDone: req.body.isDone, hasAttachment: req.body.hasAttachment}, function(err, todo){
          if(err) throw err;
          res.send('Success');
        });
      }
    else{
      var newTodo = Todos({
        username: 'test',
        todo:req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment
      });
      newTodo.save(function(err){
        if(err) throw err;
        res.send('Success');
      });
    }
  });


  //DELETE
  app.delete('/api/todo', function(req, res){
    Todos.findByIdAndRemove(req.body.id,
    function(err,todos){
      if(err) throw err;
      res.send("Success");
    });
  });


}
