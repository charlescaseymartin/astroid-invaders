import React from 'react';
import Home from './pages/home';
import Lobby from './pages/lobby';
import PilotSelection from './pages/pilotSelection';
import Game from './pages/game';
import Leaderboard from './pages/leaderboard';
import NotFound from './pages/notFound';

export interface PageRoute {
    path: string;
    title: string;
    description: string;
    Component: React.FC<any>;
}

const mainTitle = 'Astroid Indvaders';

export const pageRoutes: PageRoute[] = [
    {
        path: '/',
        title: `${mainTitle} | Home`,
        description: `${mainTitle}. A modern multiplayer version of the classic Space Indvaders.`,
        Component: Home,
    },
    {
        path: '/lobby',
        title: `${mainTitle} | Lobby`,
        description: `${mainTitle}. The lobby, where your friends and yourself get to a fleet of pilots.`,
        Component: Lobby,
    },
    {
        path: '/pilots',
        title: `${mainTitle} | Pilots`,
        description: `${mainTitle}. Select a pilot ship to defend your planet, family and friends.`,
        Component: PilotSelection,
    },
    {
        path: '/game',
        title: `${mainTitle}`,
        description: `${mainTitle}. A modern multiplayer version of the classic Space Indvaders.`,
        Component: Game,
    },
    {
        path: '/leaderboard',
        title: `${mainTitle} | Leaderboard`,
        description: `${mainTitle}. Where do you rank in the universe of fallen planets.`,
        Component: Leaderboard,
    },
    {
        path: '/404',
        title: 'Page Not Found',
        description: 'The Requested Page Could Not Be Found',
        Component: NotFound,
    },
]
