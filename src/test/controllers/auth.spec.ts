import request from 'supertest';
import { DataSource } from 'typeorm';
import { initializeApp } from '../../index';
import { ExpressServerType } from '../../types/common';


describe('Testing Player Auth Endpoint:', () => {
    let server: ExpressServerType;
    let db: DataSource;

    beforeAll((done) => {
        initializeApp()
            .then((initapp) => {
                if (initapp) {
                    server = initapp.server.listen(4723);
                    db = initapp.db;
                }
            })
            .catch((err) => console.error(err))
            .finally(done);
    });

    afterAll((done) => {
        db.destroy().finally(() => {
            server.close(done);
        });
    });

    test('GET /auth: Should return PLayer JWT', async () => {
        const res = await request(server).get('/auth');
        expect(res.status).toBe(200);
        expect(typeof res.body.token === 'string').toBe(true);
    });
});
