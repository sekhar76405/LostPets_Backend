const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const app = express();
const pool = require('./db_connect');
const routes = require('./src/routes/routes');
var cors = require('cors');
const http = require('http')
const { Server } = require('socket.io')
const { SocketAddress } = require('net')
const io_conn = require('./src/io/io_conn')

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5000", "*"],
  methods: ["GET", "POST"],
})
);
app.use("", routes);

app.listen(port, ()=>{console.log("Server listening on port " + port)});


const server = http.createServer(app)

const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

io.on("connection", (socket)=>{
  console.log("connection established with id: " + socket.id)

  socket.on("send_msg", (data)=>{
    socket.to(data.room).emit("receive_msg", data)
  })

  socket.on("join_room", (data)=>{
    console.log("joined room: " + data)
    socket.join(data);
  })

  socket.on("disconnect", (data)=>{

  })
})

const serverport = port+1
server.listen(serverport, ()=>{console.log("server started on port " + serverport)})