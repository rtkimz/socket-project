const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', function(req, res) {
  res.sendfile('index.html')
});

let clients = 0;

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
  clients++
  console.log('A user connected')

  io.sockets.emit('broadcast', {description: clients + ' clients connected!'});

  //Whenever someome disconnects this piece of code is executed
  socket.on('disconnect', function() {
    clients--
    io.sockets.emit('broadcast', {description: clients + ' clients connected!'});
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000')
})