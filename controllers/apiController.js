var userData = require('../models/userDataModel');
var bodyParser = require('body-parser');

module.exports = function(app){

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


  //***************************************************
  //
  //  Retrieve information by email
  //
  //***************************************************
  app.get('/api/authentication/:email', function(req, res){
    userData.find({ email: req.params.email},
    function(err,userData){
      if(err) throw err;
      res.send(userData);
    });
  });

  //***************************************************
  //
  //  Retrieve information by ID
  //
  //***************************************************

  app.get('/api/authentication/:id', function(req, res){
    userData.findById({ _id: req.params.id},
    function(err,userData){
      if(err) throw err;
      res.send(userData);
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
      userData.findByIdAndUpdate(req.body.id,{
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        phone:req.body.phone,
        address:req.body.address,
        email:req.body.email,
        password: req.body.password,
        num: req.body.num,
        progressNumbers:{
          drive:req.body.progressNumbers.drive}
      },
        function(err, userData){
          if(err) throw err;
          res.send(JSON.stringify({ status : 1 }));
        });
      }
    else{

      //create new
      var newUserData = userData({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        password:req.body.password
      });
      newUserData.save(function(err){
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
    userData.findByIdAndRemove(req.body.id,
    function(err,userData){
      if(err) throw err;
      res.send(JSON.stringify({ status : 1 }));
    });
  });


}
