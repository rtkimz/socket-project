const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', function(req, res) {
  res.sendfile('index.html')
});

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
  console.log('A user connected')

  //Send a message after a timeout of 4 seconds
  setTimeout(function() {
    socket.send('Send a message 4 seconds after connection!')
  }, 4000);

  //Whenever someome disconnects this piece of code is executed
  socket.on('disconnect', function() {
    console.log('A user disconnected')
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000')
})