from flask import Flask, render_template, request
from flask_socketio import SocketIO, join_room, send

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('join')
def on_join(data):
    room = data['room']
    join_room(room)

@socketio.on('message')
def handle_message(data):
    msg = data['msg']
    room = data['room']
    send(msg, room=room)

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=5000, allow_unsafe_werkzeug=True)
