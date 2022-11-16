const io = require('socket.io')(8000);
var express = require('express');
var cors = require('cors'); //use this
var app = express();
const users = {};


//   const corsOptions ={
//     origin:'http://localhost:8000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



io.on('connection', socket => {
    socket.on('new-user-joined', _name => {
        console.log(_name);
        users[socket.id] = _name;
        socket.broadcast.emit('user-joined', _name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
})
