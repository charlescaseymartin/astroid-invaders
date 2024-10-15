import { io, Socket } from 'socket.io-client';
import { ExpressServerType } from '../../types/common';
import { initializeApp } from '../../index';
import { DataSource } from 'typeorm';

describe('Testing Websocket Singleplayer Mode:', () => {
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
                        clientSocket.on('connect', done);
                    });
                }
            })
            .catch((err) => console.error(err));
    });

    afterAll((done) => {
        clientSocket.disconnect();
        database.destroy();
        server.close(done);
    });

    test('Create singleplayer: Should return Player JWT.', () => {
        expect(clientSocket.connected).toBe(true);
    });

    // test('Update singleplayer name: Should return Player JWT.', () => {
    //     expect(clientSocket.connected).toBe(true);
    // });

    // test('Update singleplayer pilot: Should return Player JWT.', () => {
    //     expect(clientSocket.connected).toBe(true);
    // });

    // test('Create singleplayer game: Should return Player JWT.', () => {
    //     expect(clientSocket.connected).toBe(true);
    // });

    // test('Handle singleplayer game over: Should return Player JWT.', () => {
    //     expect(clientSocket.connected).toBe(true);
    // });
});
