import { Server, Socket } from 'socket.io';
import { singleplayerHandler } from './index';

const handler = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log(`${socket.id} just connected.`);

        // auth user
        io.engine.use((_req: any, _res: any, next: any) => next());

        singleplayerHandler(socket);

        socket.on('disconnect', () => console.log(`${socket.id} disconnected.`));
    });

    console.log('Server Socket initialized.')
}

export default handler;
