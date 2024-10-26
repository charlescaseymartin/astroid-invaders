import { Server, Socket } from 'socket.io';
import { singleplayerHandler } from './index';
import { authenicatePlayer } from '../middleware/playerAuth';

const handler = (io: Server) => {
    io.engine.use(authenicatePlayer);

    // io.use((socket, next) => {
    //     console.log({ socketReq: socket.request });
    //     next();
    // })

    io.on('connection', (socket: Socket) => {
        console.log(`${socket.request.player.id} just connected.`);
        console.log(`${socket.id} just connected.`);
        singleplayerHandler(socket);
        socket.on('disconnect', () => console.log(`${socket.id} disconnected.`));
    });

    console.log('Server Socket initialized.')
}

export default handler;
