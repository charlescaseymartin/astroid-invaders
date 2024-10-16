import request from 'supertest';
import { initializeApp } from '../index';
import { DataSource } from 'typeorm';
import { ExpressServerType } from '../types/common';

describe('Testing application routes:', () => {
    let server: ExpressServerType;
    let datasource: DataSource;

    beforeAll((done) => {
        jest.spyOn(console, 'error');
        // @ts-ignore
        console.error.mockImplementation(() => null);

        initializeApp()
            .then((initApp) => {
                if (initApp) {
                    server = initApp.server.listen(4723);
                    datasource = initApp.db;
                }
            })
            .catch((err) => console.error(err))
            .finally(done);
    });

    afterAll((done) => {
        datasource.destroy().finally(() => {
            server.close(done);
        });
        // @ts-ignore
        console.error.mockRestore();
    });

    test('GET /: Should return NotFoundError 404', async () => {
        const res = await request(server).get('/')
        expect(res.statusCode).toBe(404);
        expect(res.text).toBe('Route \'/\' does not exist.');
    });
});
