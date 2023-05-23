const path = require('path')
const http = require('http')
const express= require('express')
const socketio = require('socket.io')

const app = express()
server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))
// run when Client connects
io.on('connection', socket => {

    // emit connects to the single client connecting
    socket.emit('message', 'Welcome! feel free to chat')

    // notifies everyone but the user thats connecting.
    // when a user connects
    socket.broadcast.emit('message', 'user has joined the chat')

    // all the clients using the chat get this message ---> io.emit() ----> this is used below in the disconnect


    // runs when a user disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat')
    })

    // listen for chat message
    socket.on('chatMessage', msg => {
        io.emit('message', msg)
    })
})
const PORT = 3000

server.listen(PORT, () => console.log(`Server is running on ${PORT}`))


// in order for the server to run, need to do this in the terminal: 
// npm install express socket.io moment
// npm install -D nodemon

//  ---package.json (this is so you dont need to restart server )
// remove test: 
// add the below
    // start: node server
    // dev: nodemon server