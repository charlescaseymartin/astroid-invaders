import { io, Socket } from 'socket.io-client';
import { ExpressServerType } from '../../types/common';
import { initializeApp } from '../../index';
import { DataSource } from 'typeorm';

describe('Testing Websocket Core:', () => {
    const port = 4723;
    let server: ExpressServerType;
    let database: DataSource;
    let clientSocket: Socket;

    beforeAll((done) => {
        initializeApp().then((res) => {
                if (res) {
                    server = res.server;
                    database = res.db;
                    server.listen(port, () => {
                        clientSocket = io(`http://localhost:${port}`);
                        clientSocket.on('connect', done);
                    });
                }
            })
            .catch((err) => console.error(err));
    });

    afterAll((done) => {
        clientSocket.disconnect();
        database.destroy().finally(() => {
            server.close(done);
        });
    });

    test('Test client connection: Should return true.', () => {
        expect(clientSocket.connected).toBe(true);
    });
});
