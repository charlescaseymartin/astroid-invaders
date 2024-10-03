import { DataSource } from 'typeorm';
import * as entities from './entities';


export const database = new DataSource({
    type: 'sqlite',
    database: './src/database/astroid_invaders.db',
    synchronize: true,
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
