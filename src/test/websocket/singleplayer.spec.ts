import request from 'supertest';
import { io, Socket } from 'socket.io-client';
import { ExpressServerType } from '../../types/common';
import { initializeApp } from '../../index';
import { DataSource } from 'typeorm';

describe('Testing Websocket Singleplayer Mode:', () => {
    const port = process.env.PORT || 4723;
    let server: ExpressServerType;
    let database: DataSource;
    let clientSocket: Socket;
    let playerToken: string;

    beforeAll((done) => {
        initializeApp().then((app) => {
            if (app) {
                server = app.server;
                database = app.db;
                server.listen(port);
                request(server).get('/auth').then((res) => {
                    if (res.body.token) playerToken = res.body.token;
                }).finally(() => {
                    console.log({ playerToken });
                    clientSocket = io({
                        transports: ["websocket"],
                        withCredentials: true,
                        extraHeaders: { Authorization: `Bearer ${playerToken}` },
                        autoConnect: false,
                    });
                    console.log('clientSocket initialized.')
                    clientSocket.on('connect', () => {
                        console.log('connected to server socket.')
                        done()
                    })
                });
            }
        })
    });

    afterAll((done) => {
        clientSocket.disconnect();
        database.destroy().finally(() => {
            server.close(done);
        });
    });

    test('Create singleplayer: Should return Player JWT.', async () => {
        clientSocket.connect();
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
