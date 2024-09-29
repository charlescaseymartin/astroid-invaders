import { io, Socket } from 'socket.io-client';
import { ExpressServerType } from '../../types';
import { initializeApp } from '../../index';
import { DataSource } from 'typeorm';

describe('Testing Websocket:', () => {
    const port = 4723;
    let server: ExpressServerType;
    let database: DataSource;
    let clientSocket: Socket;

    beforeAll((done) => {
        initializeApp()
            .then((res) => {
                if (res) {
                    server = res.server;
                    database = res.db;
                    server.listen(port, () => {
                        clientSocket = io(`http://localhost:${port}`);
                        clientSocket.on('connect', done)
                    });
                }
            })
            .catch((err) => console.error(err));
    });

    afterAll((done) => {
        new Promise((resolve, _reject) => {
            resolve(clientSocket.disconnect());
        }).then(() => {
            server.close();
            database.destroy();
            done();
        })
    });

    test('Test connection: clientSocket.connected should be true.', () => {
        expect(clientSocket.connected).toBe(true);
    });
});
