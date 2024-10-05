import { initializeApp } from '../index';
import { DataSource } from 'typeorm';
import { ExpressServerType } from '../types';


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

    test('(Player) findEntityOrThrow: Should return Player entity', async () => {
        console.log('test');
    });

    afterAll((done) => {
        db.destroy();
        app.close(done);
    });
});
