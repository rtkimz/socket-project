const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', function(req, res) {
  res.sendfile('index.html')
});

let nsp = io.of('/my-namespace')
nsp.on('connection', function(socket) {
  console.log('someone connected')
  nsp.emit('hi', 'Hello everyone!')
})
//let clients = 0;
//Whenever someone connects this gets executed
//io.on('connection', function (socket) {
//  clients++
//  socket.emit('newclientconnect', { description: 'Hey, welcome!' });
//  socket.broadcast.emit('newclientconnect', { description: clients + ' clients connected!' })
//  //Whenever someome disconnects this piece of code is executed
//  socket.on('disconnect', function () {
//    clients--
//    socket.broadcast.emit('broadcast', { description: clients + ' clients connected!' });
//  });
//});

http.listen(3000, function() {
  console.log('listening on *:3000')
})