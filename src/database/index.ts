import { resolve } from 'path';
import { DataSource } from 'typeorm';
import { initializeEnvVars } from '../env.config';
import * as entities from './entities';


initializeEnvVars();

const database = new DataSource({
    type: 'sqlite',
    database: resolve(__dirname, `${process.env.DB_FILE}`),
    logging: false,
    entities: Object.values(entities),
    migrations: [`${process.env.DB_MIGRATIONS}`],
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

export default database;
