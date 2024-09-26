import request from 'supertest';
import { initializeApp } from '../index';
import { DataSource } from 'typeorm';
import { ExpressServerType } from '../types';

describe('Testing application routes:', () => {
    let server: ExpressServerType;
    let datasource: DataSource;

    beforeAll(async () => {
        try {
            const initApp = await initializeApp();
            if (initApp) {
                server = initApp.app.listen(4723);
                datasource = initApp.db;
            }
        } catch (err) {
            console.error(err);
        }
    });

    test('GET /: Should return NotFoundError 404', async () => {
        try {
            const res = await request(server).get('/')
            expect(res.statusCode).toBe(404);
            expect(res.text).toBe('Route \'/\' does not exist.');
        } catch (err: any) {
            console.error(err.message);
        }
    });

    afterAll(() => {
        server.close();
        datasource.destroy();
    });
});
