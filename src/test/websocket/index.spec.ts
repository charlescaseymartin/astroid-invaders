import { io, type Socket } from 'socket.io-client';
import { initializeApp } from '../../index';
import { DataSource } from 'typeorm';
import { ExpressServerType } from '../../types';

describe('Testing Websocket:', () => {
    const port = 4723;
    let server: ExpressServerType;
    let datasource: DataSource;
    let clientSocket: Socket;

    beforeAll(async () => {
        try {
            const initApp = await initializeApp();
            if (initApp) {
                server = initApp.app.listen(port);
                datasource = initApp.db;
                clientSocket = io(`http://localhost:${port}`, { autoConnect: false });
            }
        } catch (err) {
            console.error(err);
        }
    });

    test('On connection: Should return welcome message', () => {
        clientSocket.connect();
        clientSocket.on('hello', (message) => console.log(message));
        console.log('--> after connection');
    });

    afterAll(() => {
        server.close();
        clientSocket.disconnect();
        datasource.destroy();
    });
});
