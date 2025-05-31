import { FC, MouseEvent, useCallback, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { PlayerMode, useAppContext } from '../context';
import { createSocket, authPlayer } from '../utils';

const Home: FC = () => {
    const [state, dispatch] = useAppContext();
    const { mode, authToken, socket } = state;

    const handleSingleplayer = async (_event: MouseEvent) => {
        const mode = PlayerMode.pilot;
        dispatch('setMode', mode);

        try {
            if (!authToken && !socket) {
                const token = await authPlayer(mode);
                dispatch('setAuthToken', token);
                const userSocket = createSocket(token, mode);
                dispatch('setSocket', userSocket);
            };
        } catch (err) {
            console.error(err);
        }
    }

    const handleMultiplayer = async (_event: MouseEvent) => {
        if (mode) {
            console.log({ mode })
            return;
        }
        dispatch('setMode', PlayerMode.crew);
        try {
            if (!authToken && !socket) {
                const token = await authPlayer(PlayerMode.crew);
                dispatch('setAuthToken', token);
                const userSocket = createSocket(token, PlayerMode.crew);
                dispatch('setSocket', userSocket);
            };
        } catch (err) {
            console.error(err);
        }
    }

    const handlePilotCommunication = useCallback((socket: Socket) => {
        socket.emit('singleplayer');
        socket.on('singleplayer:connected', (message) => console.log({ message }));
    }, []);

    const handleCrewCommunication = useCallback((socket: Socket) => {
        socket.emit('multiplayer');
        socket.on('multiplayer:connected', (message) => console.log({ message }));
    }, []);


    useEffect(() => {
        if (!mode || !authToken || !socket) return;
        dispatch('connectSocket');

        if (mode === PlayerMode.pilot) {
            handlePilotCommunication(socket);
        } else {
            handleCrewCommunication(socket);
        }
    }, [
        mode,
        authToken,
        socket,
        dispatch,
        handlePilotCommunication,
        handleCrewCommunication
    ])

    return (
        <div>
            <h1>Home page!</h1>
            <button onClick={handleSingleplayer}>single player</button>
            <button onClick={handleMultiplayer}>multi player</button>
        </div>
    )
}

export default Home;
