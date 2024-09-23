import { Server } from 'socket.io';

export const webSocketServerHandler = (socketServer: Server) => {
    socketServer.on('connection', (socket) => {
        socket.on('disconnect', () => {
            console.log('user disconnected!');
        });

        socket.on('message', (data) => {
            console.log('message user sent:', data);
        });
    });
}
