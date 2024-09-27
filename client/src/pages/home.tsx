import { FC, MouseEvent } from 'react';
import { useAppContext } from '../context';

const Home: FC = () => {
    const { socket } = useAppContext();

    const singleplayerHandler = (_event: MouseEvent) => {
        if (!socket.connected) socket.connect();
        socket.emit('singleplayer');
        socket.on('singleplayer:connected', (message) => console.log({ message }));
    }

    const multiplayerHandler = (_event: MouseEvent) => {
        if (!socket.connected) socket.connect();
        socket.on('hello', (message) => console.log({ message }));
    }

    return (
        <div>
            <h1>Home page!</h1>
            <button onClick={singleplayerHandler}>single player</button>
            <button onClick={multiplayerHandler}>multi player</button>
        </div>
    )
}

export default Home;
