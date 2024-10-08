import * as dotenv from 'dotenv';


export const initializeEnvVars = () => {
    if (process.env.NODE_ENV !== 'development') {
        dotenv.config({ path: '../.env.prod' });
    } else {
        dotenv.config({ path: '../.env.dev' });
    }
}
