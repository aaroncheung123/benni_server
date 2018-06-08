var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
})
io.on('connection', function(socket){
  console.log('one user connected ' + socket.id);
  socket.on('message',function(data){
    console.log(data);
    var sockets = io.sockets.sockets;
        // sockets.forEach(function(sock){
        //     if(sock.id != socket.id)
        //     {
        //         sock.emit('message',data);
        //     }
        // })
      socket.broadcast.emit('message', data);
  })
  socket.on('disconnect', function(){
    console.log('one user disconnected ' + socket.id);
  })
})
http.listen(3000, function(){
  console.log('server listening on port 3000');
})


// var mongoose = require('mongoose');
// var config = require('./config');
// var setupController = require('./controllers/setupController');
// var apiController = require('./controllers/apiController');
//
// var port = process.env.PORT || 3000;
//
// app.use('/assets', express.static(__dirname + '/public'));
//
// app.set('view engine', 'ejs');
//
// mongoose.connect(config.getDbConnectionString());
// setupController(app);
// apiController(app);
//
// app.listen(port);
