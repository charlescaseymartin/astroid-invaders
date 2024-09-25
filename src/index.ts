import 'module-alias/register';
import 'reflect-metadata';
import 'dotenv/config';
import path from 'path';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { database } from './database';
import { clientSideRoutingHandler } from './middleware/client';
import { webSocketServerHandler } from './socket';
import { errorHandler } from './middleware/errorHandler';

const initialExpressServer = () => {
    const app = express();
    const port = process.env.PORT;
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(clientSideRoutingHandler);
    app.use(express.static(path.join(__dirname, 'build')));
    app.use(errorHandler);
    const server = app.listen(port, () => console.log(`\nServer is listening on port: ${port}...\n`));
    const ioServer = new Server(server);
    webSocketServerHandler(ioServer);
}

const initializeApp = () => {
    database.initialize()
        .then(() => {
            console.log('Database successfully initialized.');
            initialExpressServer();
        })
        .catch((err) => {
            console.error('Database initialization error!', err);
        });
}

initializeApp();
