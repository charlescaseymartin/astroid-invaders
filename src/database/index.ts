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

