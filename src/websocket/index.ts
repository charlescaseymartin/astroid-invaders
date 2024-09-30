import { Server, type Socket } from 'socket.io';

export const webSocketServerHandler = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log(`${socket.id} just connected.`);

        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnected.`);
        });

        socket.on('singleplayer', () => {
            socket.emit('singleplayer:connected', 'connected to singleplayer channel');
            // create singleplayer lobby
            // create player
            // create player jwt cookie
            // send jwt to player
            // get player name
            // get player pilot
            // send initial game state
            // get player keystrokes
            // update game state
            // send updated game state
            //
        });

        socket.on('multiplayer', () => {
            socket.emit('multiplayer:connected', 'connected to multiplayer channel');
        });
    });
    console.log('Server Socket initialized.')
}
