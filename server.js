// server.js
const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const port           = 8000;

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/app'));
app.use(bodyParser.urlencoded({ extended: true }));

server.listen(port,() => {
    console.log("server listening on"+port);
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection',function(socket){
  console.log('client connected');
  socket.emit('news', { hello: 'world' });
  socket.on('disconnect', function () {
    console.log('disconnect');
  });

});
