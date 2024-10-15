import { initializeApp } from '../../index';
import { DataSource } from 'typeorm';
import { ExpressServerType } from '../../types/common';


describe('Testing Player Controller:', () => {
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

    test('(/api/player/name): Should update Player name', async () => {
       console.log('test');
    });

    test('(/api/player/pilot): Should update Player pilot', async () => {
       console.log('test');
    });

    test('(/api/player/score): Should update Player score', async () => {
       console.log('test');
    });

    test('(/api/player/crew): Should update Player crew', async () => {
       console.log('test');
    });

    afterAll((done) => {
        db.destroy();
        app.close(done);
    });
});
