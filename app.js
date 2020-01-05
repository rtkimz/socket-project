const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', function(req, res) {
  res.sendfile('index.html')
});

let users = []
io.on('connection', function(socket) {
  console.log('A user has connected')
  socket.on('setUsername', function(data) {
    if(users.indexOf(data) > -1) {
      socket.emit('userExists', data + ' username is taken! Try some other username.')
    } else {
      users.push(data)
      socket.emit('userSet', {username: data})
    }
  })

  socket.on('msg', function(data) {
    // Send message to everyone
    io.sockets.emit('newmsg', data)
  })
})

http.listen(3000, function() {
  console.log('listening on *:3000')
})