import { Server, type Socket } from 'socket.io';

export const webSocketServerHandler = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log(`${socket.id} just connected.`);
        socket.emit('hello', `Welcome user`);

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
    console.log('Socket initialized.');
}
