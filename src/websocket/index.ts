import { Server } from 'socket.io';

export const webSocketServerHandler = (io: Server) => {
    io.on('connection', (socket) => {
        console.log('Websocket connection was made!');
        socket.emit('hello', 'Welcome To Astroid Invaders!');

        socket.on('disconnect', () => {
            console.log('user disconnected!');
        });

        socket.on('message', (data) => {
            console.log('message user sent:', data);
        });
    });
}
