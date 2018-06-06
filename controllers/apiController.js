var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function(app){

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


  //***************************************************
  //
  //  Retrieve information by username
  //
  //***************************************************
  app.get('/api/authentication/:username', function(req, res){
    Todos.find({ username: req.params.username},
    function(err,todos){
      if(err) throw err;
      res.send(todos);
    });
  });

  //***************************************************
  //
  //  Retrieve information by username
  //
  //***************************************************

  app.get('/api/authentication/:id', function(req, res){
    Todos.findById({ _id: req.params.id},
    function(err,todos){
      if(err) throw err;
      res.send(todos);
    });
  });

  //***************************************************
  //
  //  Post request
  //
  //***************************************************

  app.post('/api/authentication', function(req, res){

    //update existing
    if(req.body.id){
      Todos.findByIdAndUpdate(req.body.id,{
        username:req.body.username, password: req.body.password, info: req.body.info}, function(err, todo){
          if(err) throw err;
          res.send(JSON.stringify({ status : 1 }));
        });
      }
    else{

      //create new
      var newTodo = Todos({
        username: req.body.username,
        password:req.body.password,
        info: req.body.info
      });
      newTodo.save(function(err){
        if(err) throw err;
        res.send(JSON.stringify({ status : 1 }));
      });
    }
  });


  //***************************************************
  //
  //  Delete request
  //
  //***************************************************

  app.delete('/api/authentication', function(req, res){
    Todos.findByIdAndRemove(req.body.id,
    function(err,todos){
      if(err) throw err;
      res.send(JSON.stringify({ status : 1 }));
    });
  });


}
