const socket = io();
let room = '';

function joinRoom() {
  room = document.getElementById('room').value;
  socket.emit('join', { room: room });
  document.getElementById('chat').style.display = 'block';
}

function sendMsg() {
  const msg = document.getElementById('msg').value;
  socket.emit('message', { msg: msg, room: room });
  addMessage('나: ' + msg);
  document.getElementById('msg').value = '';
}

socket.on('message', (msg) => {
  addMessage('상대: ' + msg);
});

function addMessage(text) {
  const div = document.createElement('div');
  div.textContent = text;
  document.getElementById('messages').appendChild(div);
}