import request from 'supertest';
import { initializeApp } from '../index';
import { DataSource } from 'typeorm';
import { ExpressServerType } from '../types/common';

describe('Testing application routes:', () => {
    let server: ExpressServerType;
    let datasource: DataSource;

    beforeAll(async () => {
        jest.spyOn(console, 'error');
        // @ts-ignore
        console.error.mockImplementation(() => null);
        try {
            const initApp = await initializeApp();
            if (initApp) {
                server = initApp.server.listen(4723);
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

    afterAll((done) => {
        datasource.destroy();
        server.close(done);
        // @ts-ignore
        console.error.mockRestore();
    });
});
