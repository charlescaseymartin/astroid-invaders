import React from 'react';
import Home from './pages/home';
import NotFound from './pages/notFound';

export interface PageRoute {
    path: string;
    title: string;
    description: string;
    Component: React.FC<any>;
}

export const pageRoutes: PageRoute[] = [
    {
        path: '/',
        title: 'Express React Typescript App | Home',
        description: 'This is a template for a Express.js server that serves a React.js application using Typescript.',
        Component: Home,
    },
    {
        path: '/404',
        title: 'Page Not Found',
        description: 'The Requested Page Could Not Be Found',
        Component: NotFound,
    },
]
