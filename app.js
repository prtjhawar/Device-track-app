const { create } = require('domain');
const express = require('express');
const app = express();
const http = require("http");
const path = require('path');


const socetio = require("socket.io")

const server = http.createServer(app)

const io = socetio(server)

app.set('view engine' ,"ejs")
app.use(express.static(path.join(__dirname,"public")))
let socketsconnected = new Set()

io.on("connection",function(socket){
    
    socket.on("send-location",function(data){
        console.log(socket.id);
        socketsconnected.add(socket.id)
    
        io.emit("recive-loction",{id: socket.id, ...data});

    })
    socket.on("disconnect",function(){
        console.log('Socket disconnected',socket.id)
        socketsconnected.delete(socket.id)
        io.emit("user-disconnect",socket.id)
    })
    
})


app.get("/",(req,res)=>{
    res.render("index")
})

server.listen(4000,()=>{
    console.log("app is listing succesfuly");
    
})