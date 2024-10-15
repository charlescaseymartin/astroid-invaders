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
import { privateRouter, publicRouter } from './routes';


const initialExpressServer = (): ExpressServerType => {
    const app = express();
    const server = createServer(app);
    const io = new Server(server);
    const port = process.env.PORT;
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'build')));
    app.use(clientSideRoutingHandler);
    app.use(errorHandler);
    app.use('/api', publicRouter);
    app.use('/api', privateRouter);
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
