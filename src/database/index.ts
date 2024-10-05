import path from 'path';
import { DataSource } from 'typeorm';
import * as entities from './entities';

let configFile = path.resolve(__dirname, 'test.db');

if (process.env.NODE_ENV == 'development') {
    configFile = path.resolve(__dirname, 'dev.db');
} else if (process.env.NODE_ENV == 'production') {
    configFile = path.resolve(__dirname, 'prod.db');
}

export const database = new DataSource({
    type: 'sqlite',
    database: configFile,
    logging: false,
    entities: Object.values(entities),
    migrations: [],
    subscribers: [],
});

export const initializeDatabase = async (): Promise<DataSource | undefined> => {
    try {
        await database.initialize();
        console.log('Initialized database.');
        return database;
    } catch (err) {
        console.error('Database initialization error!', err);
    }
}
