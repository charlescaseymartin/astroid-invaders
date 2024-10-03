import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import { pageRoutes } from '@client/src/routes';
import { RouteNotFoundError } from '../utils/errors';

export const clientSideRoutingHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (/(.ico|.js|.css|.jpg|.png|.svg|.map)$/i.test(req.path)) {
        next();
    } else {
        try {
            if (req.path !== '/'.toString() || req.path !== '/404'.toString() || req.path !== '/leaderboard'.toString()) {
                console.log('check for user');
            }

            console.log('path:', req.path);

            const filePath = path.resolve(__dirname, 'build', 'index.html')
            let indexFileData = fs.readFileSync(filePath, 'utf8');
            let title = 'Resource Not Found';
            let description = 'The requested resource could not be found.';
            const page = pageRoutes.find((route) => req.path == route.path);

            if (page) {
                title = page.title;
                description = page.description;
            }

            indexFileData = indexFileData.replace(/\$OG_TITLE/g, title);
            indexFileData = indexFileData.replace(/\$OG_DESCRIPTION/g, description);

            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            return res.send(indexFileData);
        } catch (err: any) {
            if (err.code && err.code === 'ENOENT') {
                return next(new RouteNotFoundError(req.originalUrl));
            }
            return next(err);
        }
    }
}
