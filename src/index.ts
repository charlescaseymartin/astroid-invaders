import 'module-alias/register';
import 'reflect-metadata';
import 'dotenv/config';
import path from 'path';
import cors from 'cors';
import express, { Application } from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { DataSource } from 'typeorm';
import { initializeDatabase } from './database';
import { clientSideRoutingHandler } from './middleware/client';
import { errorHandler } from './middleware/errorHandler';
import { webSocketServerHandler } from './websocket';

export type InitializeAppType = {
    app: Application;
    db: DataSource;
}

const initialExpressServer = () => {
    const app = express();
    const server = createServer(app);
    const io = new Server(server);
    const port = process.env.PORT;
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(clientSideRoutingHandler);
    app.use(express.static(path.join(__dirname, 'build')));
    app.use(errorHandler);
    webSocketServerHandler(io);
    if (process.env.NODE_ENV !== 'test') {
        server.listen(port, () => console.log(`\nServer is listening on port: ${port}...\n`));
    }
    return app;
}

export const initializeApp = async (): Promise<InitializeAppType | undefined> => {
    try {
        let result: InitializeAppType = {} as InitializeAppType;
        const database = await initializeDatabase();
        if (database) result.db = database;
        result.app = initialExpressServer();
        return result;
    } catch (err) {
        console.error('Application initialization error!', err);
    }
}

initializeApp();
