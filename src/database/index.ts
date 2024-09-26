import { DataSource } from 'typeorm';

export const database = new DataSource({
    type: 'sqlite',
    database: './src/database/db.sqlite',
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: [],
});

export const initializeDatabase = async (): Promise<DataSource | undefined> => {
    try {
        console.log('Initializing database...');
        await database.initialize();
        return database;
    } catch (err) {
        console.error('Database initialization error!', err);
    }
}
