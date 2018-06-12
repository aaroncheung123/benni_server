var express = require('express');
var app = express();
var http = require('http').Server(app);

//*****************************************
// SOCKET IO
//*****************************************


var io = require('socket.io')(http);
io.on('connection', function(socket){
  console.log('one user connected ' + socket.id);
  socket.on('message',function(data){
    console.log(data);

    //splicing the email in order to broadcast to specific client
    var email;
    var message;
    for (var i = 0; i < data.length; i++) {
      if(data[i] == ':'){
        email = data.slice(0,i);
        message = data.slice(i+1);
      }
    }
    var sockets = io.sockets.sockets;
    socket.broadcast.emit(email, message);
  })
  socket.on('disconnect', function(){
    console.log('one user disconnected ' + socket.id);
  })
})



// *****************************************
// RESTFUL ROUTES
//******************************************

var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());
setupController(app);
apiController(app);


http.listen(3000, function(){
  console.log('server listening on port 3000');
})
