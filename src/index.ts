import fs from 'fs';
import path from 'path';
import express, { Request, Response, NextFunction, Application } from 'express';
import dotenv from 'dotenv';
import { pageRoutes } from '../client/src/routes';

dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8000;

app.use((req: Request, res: Response, next: NextFunction) => {
    if (/(.ico|.js|.css|.jpg|.png|.svg|.map)$/i.test(req.path)) {
        next();
    } else {
        const filePath = path.resolve(__dirname, 'build', 'index.html')
        fs.readFile(filePath, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
            let title = 'Page Not Found';
            let description = 'The Requested Page Could Not Be Found';

            const page = pageRoutes.find((route) => req.path == route.path)

            if (page) {
                title = page.title;
                description = page.description;
            }

            data = data.replace(/\$OG_TITLE/g, title);
            data = data.replace(/\$OG_DESCRIPTION/g, description);

            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            res.send(data);
        })
    }
});

app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => {
    console.log(`\nServer is listening on port: ${port}...`);
    console.log('Press Ctrl+C to quit.\n');
});

