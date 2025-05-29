import { io, Socket } from 'socket.io-client';

export const createSocket = (authToken: string): Socket => {
    return io(process.env.REACT_APP_API_URL, {
        autoConnect: false,
        withCredentials: true,
        auth: { token: authToken },
    })
}
