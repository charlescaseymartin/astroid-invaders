import 'module-alias/register';
import 'reflect-metadata';
import path from 'path';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { initializeDatabase } from './database';
import { initializeEnvVars } from './env.config';
import { clientSideRoutingHandler } from './middleware/client';
import { errorHandler } from './middleware/errorHandler';
import websocket from './websocket';
import { ExpressServerType, InitializeAppType } from './types/common';
import { authorizePlayer } from './controllers/auth';

import { Player } from './database/entities';


declare global {
    namespace Express {
        export interface Request {
            player: Player;
        }
    }
}

declare module 'http' {
    interface IncomingMessage {
        player: Player;
    }
}

const initialExpressServer = (): ExpressServerType => {
    const app = express();
    const server = createServer(app);
    const domain = process.env.DOMAIN || 'http://localhost';
    const port = process.env.PORT || '3000';
    const isDevEnv = process.env.NODE_ENV == 'development';
    const origin = isDevEnv ? `${domain}:3000` : `${domain}:${port}`;
    const io = new Server(server, {
        cors: {
            origin,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Authorization'],
            credentials: true,
        }
    });
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    if (!isDevEnv) app.use(express.static(path.join(__dirname, 'build')));
    app.use(clientSideRoutingHandler);
    app.use(errorHandler);
    app.get('/auth', authorizePlayer);
    websocket(io);
    if (process.env.NODE_ENV !== 'test') {
        server.listen(port, () => console.log(`\nServer is listening on port: ${port}...\n`));
    }
    return server;
}

export const initializeApp = async (): Promise<InitializeAppType | undefined> => {
    initializeEnvVars();
    try {
        let result = {} as InitializeAppType;
        const database = await initializeDatabase();
        if (database) result.db = database;
        result.server = initialExpressServer();
        return result;
    } catch (err) {
        console.error('Application initialization error!', err);
    }
}

initializeApp();
