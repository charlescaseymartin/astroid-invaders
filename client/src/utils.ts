import { io, Socket } from 'socket.io-client';
import { PlayerMode } from './context';

const playerTokenKey = 'player-token';

export const authPlayer = async (mode: string) => {
    const storedPlayerToken = localStorage.getItem(playerTokenKey);
    if (!storedPlayerToken) {
        const res = await fetch(`/auth?mode=${mode}`, {
            method: 'post',
            headers: { ['Content-Type']: 'application/json' }
        });
        const { token } = await res.json();
        localStorage.setItem(playerTokenKey, token)
        return token;
    }
    return storedPlayerToken;
}

export const createSocket = (token: string, mode: PlayerMode): Socket => {
    return io(process.env.REACT_APP_API_URL, {
        autoConnect: false,
        withCredentials: true,
        transports: ['websocket'],
        auth: { token, mode },
    })
}
