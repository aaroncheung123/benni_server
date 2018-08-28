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
    userData.find({ 'info.email': req.params.email },
    function(err,userData){
      if(err) throw err;
      console.log(userData);
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
          loved:req.body.progressNumbers.loved,
          happy:req.body.progressNumbers.happy}
      },
        function(err, userData){
          if(err) throw err;
          res.send(JSON.stringify({ status : 1 }));
        });
      }
    else{

      //create new
      var newUserData = userData({
        info:{
          firstName: req.body.info.firstName,
          lastName: req.body.info.lastName,
          phone: req.body.info.phone,
          address: req.body.info.address,
          email: req.body.info.email,
          password:req.body.info.password
        },

        progressNumbers:{
          loved:req.body.progressNumbers.loved,
          happy:req.body.progressNumbers.happy
        }
      });
      newUserData.save(function(err){
        if(err) throw err;
        res.send(JSON.stringify({ status : 1 }));
      });
    }
  });

  //***************************************************
  //
  //  Post request
  //
  //***************************************************

  app.post('/api/authentication/data', function(req, res){
    //update existing
    if(req.body.id){
      userData.findByIdAndUpdate(req.body.id,{
        progressNumbers:{
          loved:req.body.progressNumbers.loved,
          happy:req.body.progressNumbers.happy}
      },
        function(err, userData){
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
