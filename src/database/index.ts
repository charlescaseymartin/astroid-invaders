import path from 'path';
import { DataSource } from 'typeorm';
import { initializeEnvVars } from '../env.config';

initializeEnvVars();

const env = process.env;
let configFile = env.NODE_ENV == 'test' ? path.resolve(__dirname, 'test.db') : `${env.DB_PATH}`;

const database = new DataSource({
    type: 'sqlite',
    database: configFile,
    logging: false,
    entities: ['./entities/*.ts'],
    migrations: ['./migrations/*.ts'],
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
