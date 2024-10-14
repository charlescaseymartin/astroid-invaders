import React from 'react';
import Home from './pages/home';
import Lobby from './pages/lobby';
import PilotSelection from './pages/pilotSelection';
import Game from './pages/game';
import Leaderboard from './pages/leaderboard';
import NotFound from './pages/notFound';

export interface PageRoute {
    path: string;
    Component: React.FC<any>;
}

export const pageRoutes: PageRoute[] = [
    {
        path: '/',
        Component: Home,
    },
    {
        path: '/lobby',
        Component: Lobby,
    },
    {
        path: '/pilots',
        Component: PilotSelection,
    },
    {
        path: '/game',
        Component: Game,
    },
    {
        path: '/leaderboard',
        Component: Leaderboard,
    },
    {
        path: '/404',
        Component: NotFound,
    },
]
