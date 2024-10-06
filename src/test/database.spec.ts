import { initializeApp } from '../index';
import { DataSource } from 'typeorm';
import { ExpressServerType } from '../types';
import {
    Pilot,
    Enemy,
    Player,
    Crew,
    PlayerLeaderboard,
    CrewLeaderboard
} from '../database/entities';
import {
    findEntityOrThrow,
    createEntity,
    updateEntity,
    deleteEntity
} from '../utils/typeorm';


describe('Testing database CRUD functions:', () => {
    let app: ExpressServerType;
    let db: DataSource;

    beforeAll(async () => {
        try {
            const initapp = await initializeApp();
            if (initapp) {
                app = initapp.server.listen(4723);
                db = initapp.db;
            }
        } catch (err) {
            console.error(err);
        }
    });

    test('(Pilot) findEntityOrThrow: Should return Pilot entity', async () => {
       console.log('test');
    });

    afterAll((done) => {
        db.destroy();
        app.close(done);
    });
});
