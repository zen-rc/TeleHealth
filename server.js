const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const chatRoutes = require("./routes/chat")
const bodyParser = require('body-parser');
const qrCodejs = require('qrcodejs');
const http = require('http');
const server = http.createServer(app);
// const { Server } = require("socket.io");
const socketio = require('socket.io')
const io = socketio(server)
const path = require('path')
const PORT = process.env.PORT || 6130

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//Body Parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/chat", chatRoutes);


// FOR CHATROOM

const botName = '*Hazel '
// run when Client connects

const moment = require('moment')
function formatMessage(username, text) {
 return {
    username,
    text,
    time: moment().format('h:mm a')
 }
}

io.on('connection', socket => {

    // emit connects to the single client connecting
    socket.emit('message', formatMessage(botName, 'Welcome! feel free to chat'))

    // notifies everyone but the user thats connecting.
    // when a user connects
    socket.broadcast.emit('message',formatMessage(botName, 'user has joined the chat'))

    // all the clients using the chat get this message ---> io.emit() ----> this is used below in the disconnect


    // runs when a user disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has left the chat'))
    })

    // listen for chat message
    socket.on('chatMessage', msg => {
      console.log('server js', msg)
        io.emit('message', formatMessage(msg.username, msg.text))
    })
})

//Server Running
// app.listen(process.env.PORT, () => {
//   console.log("Server is running, you better catch it!");
// });

server.listen(PORT, () => console.log(`Server is running on ${PORT}`))
