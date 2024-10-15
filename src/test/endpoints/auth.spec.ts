import request from 'supertest';
import { DataSource } from 'typeorm';
import { initializeApp } from '../../index';
import { ExpressServerType } from '../../types/common';


describe('Testing Player Auth Endpoint:', () => {
    let server: ExpressServerType;
    let db: DataSource;

    beforeAll(async () => {
        try {
            const initapp = await initializeApp();
            if (initapp) {
                server = initapp.server.listen(4723);
                db = initapp.db;
            }
        } catch (err) {
            console.error(err);
        }
    });

    test('(/api/login): Should return PLayer JWT', async () => {
        try {
            const res = await request(server).get('/api/login');
            expect(res.status).toBe(200);
            expect(typeof res.body.token === 'string').toBe(true);
        } catch (err) {
            console.error(err);
        }
    });

    afterAll((done) => {
        db.destroy().then(() => {
            server.close(done);
        });
    });
});
