const path= require('path');
const express = require('express');
const app = express();

//Setings
app.set('port',process.env.PORT || 3000);

//Static Files
app.use(express.static(path.join(__dirname,'public')));


//Start server
const server = app.listen(app.get('port'), () => {
    console.log('app listening on port', app.get('port'));
});

const SocketIO = require('socket.io');
const io = SocketIO(server);


//WebSocket
io.on('connection', (socket)=>{
    console.log('a user connected', socket.id);

    socket.on('chat:message',(data)=>{
        io.sockets.emit('chat:message',data);
    })

    socket.on('chat:typing',(data)=>{
        socket.broadcast.emit('chat:typing',data);
    })
});


