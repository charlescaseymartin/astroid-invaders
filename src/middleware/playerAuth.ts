import { Socket } from 'socket.io';
import { verifyToken } from '../utils/authToken';
import { Player } from '../database/entities';
import { InvalidTokenError } from '../utils/errors';


type NextFunction = (error?: Error) => void;

export const authenicatePlayer = (socket: Socket, next: NextFunction) => {
    try {
        const token = socket.handshake.auth.token;
        if (!token) throw new InvalidTokenError('Authentication token not found.');
        const { id } = verifyToken(token);
        if (!id) throw new InvalidTokenError('Authentication token is invalid.');

        Player.findOneBy({ id }).then((player) => {
            if (!player) throw new InvalidTokenError('Authentication token is invalid: Player not found.');
            socket.data.player = player;
            next();
        });
    } catch (err) {
        console.error(err)
        next(err as Error);
    }
};

