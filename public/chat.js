const socket = io();

//DOM Elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', function() {
    socket.emit('chat:message',{
        username: username.value,
        message: message.value
    });
    message.value = '';
})

message.addEventListener('keyup', function(e) {
    if(e.key=='Enter') {
        socket.emit('chat:message',{
            username: username.value,
            message: message.value
        });
        message.value = '';
    }
});

message.addEventListener('keypress',function(){
    socket.emit('chat:typing',username.value);
});

socket.on('chat:typing',(data)=>{
    actions.innerHTML = `<p>
        <em>${data}</em> is typing...
    </p>
    `;
})

socket.on('chat:message', function(data) {
    actions.innerHTML = '';
    output.innerHTML += `
        <p>
            <strong>${data.username}</strong>: ${data.message}
        </p>
    `
})