const socket = io('http://localhost:8000',{ transports: ["websocket"] });
const form = document.getElementById('send-box');
const msgInp = document.getElementById('msgInput');
const msgCont = document.querySelector(".container");


const append = (message,position) => {
    const elem = document.createElement('div');
    elem.innerText = message;
    elem.classList.add('message');
    elem.classList.add(position);
    msgCont.append(elem);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInp.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message);
});

const _name = prompt('Enter your name to join Chat Room');
socket.emit('new-user-joined', _name);

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

socket.on('user-joined', _name => {
    append(`${_name} has joined the chat`, 'right');
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
});