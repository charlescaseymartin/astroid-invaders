import { Server } from 'socket.io';

export const webSocketServerHandler = (io: Server) => {
    io.on('connection', (socket) => {
        console.log(`${socket.id} just connected.`);

        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnected.`);
        });

        socket.on('singleplayer', () => {
            socket.emit('singleplayer:connected', 'connected to singleplayer channel');
        });

        socket.on('multiplayer', () => {
            socket.emit('multiplayer:connected', 'connected to multiplayer channel');
        });
    });
}
