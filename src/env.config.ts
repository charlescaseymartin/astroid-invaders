import { resolve } from 'path';
import * as dotenv from 'dotenv';


export const initializeEnvVars = () => {
    if (process.env.NODE_ENV == 'production') {
        dotenv.config({ path: resolve(__dirname, '..', '.env.prod') });
    } else {
        dotenv.config({ path: resolve(__dirname, '..', '.env.dev') });
    }
}
