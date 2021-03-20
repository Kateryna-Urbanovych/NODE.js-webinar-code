const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
})

app.use('*', (req, res) => {
  res.send('WebSocket Server')
})

let users = {}

io.on('connection', (client) => {
  console.log(`Connection ${client.id}`)
  users[client.id] = 'Anonim'
  my_broadcast('users', users)

  client.on('change:name', (name) => {
    users[client.id] = name
    my_broadcast('users', users)
  })

  client.on('message', (message) => {
    my_broadcast('message', message)
  })

  client.on('disconnect', (data) => {
    delete users[client.id]
    my_broadcast('users', users)
  })

  function my_broadcast(event, data) {
    client.emit(event, data)
    client.broadcast.emit(event, data)
  }
})

const PORT = process.env.PORT || 5000
http.listen(PORT, () => {
  console.log(`listening on: ${PORT}`)
})
