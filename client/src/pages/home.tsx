import { FC, MouseEvent, useCallback, useEffect } from 'react';
import { PlayerMode, useAppContext } from '../context';
import { createSocket } from '../utils';
import { Socket } from 'socket.io-client';

const Home: FC = () => {
    const [state, dispatch] = useAppContext();
    const { mode, authToken, socket } = state;

    const handleSingleplayer = async (_event: MouseEvent) => {
        try {
            dispatch('setMode', PlayerMode.pilot);
            console.log({ mode, authToken, socket })
            if (!authToken && !socket) {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/auth`);
                const { token } = await res.json();
                dispatch('setAuthToken', token);
                console.log({ token })
                const userSocket = createSocket(token);
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
                const res = await fetch(`${process.env.REACT_APP_API_URL}/auth`);
                const { token } = await res.json();
                dispatch('setAuthToken', token);
                console.log({ token })
                const userSocket = createSocket(token);
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
        if (!mode) return;
        console.log('mode:', mode)

        if (!authToken) return;
        console.log('authToken:', authToken)

        if (!socket) return;
        console.log('socket:', socket)

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
