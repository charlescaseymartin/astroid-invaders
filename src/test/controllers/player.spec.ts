import { initializeApp } from '../../index';
import { DataSource } from 'typeorm';
import { ExpressServerType } from '../../types/common';


describe('Testing Player Controller:', () => {
    let app: ExpressServerType;
    let db: DataSource;

    beforeAll((done) => {
        initializeApp()
            .then((initapp) => {
                if (initapp) {
                    app = initapp.server.listen(4723);
                    db = initapp.db;
                }
            })
            .catch((err) => console.error(err))
            .finally(done);
    });

    afterAll((done) => {
        db.destroy().finally(() => {
            app.close(done);
        });
    });

    test('GET /api/player: Should return Player', async () => {
        console.log('test');
    });

    test('PUT /api/player/name: Should update Player name', async () => {
        console.log('test');
    });

    test('PUT /api/player/score: Should update Player score', async () => {
        console.log('test');
    });

    test('PUT /api/player/pilot: Should update Player pilot', async () => {
        console.log('test');
    });

    test('PUT /api/player/crew: Should update Player crew', async () => {
        console.log('test');
    });
});
