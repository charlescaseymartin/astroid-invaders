import { Server, IncomingMessage, ServerResponse } from 'http';
import { DataSource } from 'typeorm';
import {
    Pilot,
    Enemy,
    Player,
    Crew,
    PlayerLeaderboard,
    CrewLeaderboard
} from '../database/entities';

// Express Types
export type ExpressServerType = Server<typeof IncomingMessage, typeof ServerResponse>;

export type InitializeAppType = {
    server: ExpressServerType;
    db: DataSource;
}


// Typeorm Types
export type EntityConstructor = typeof Pilot | typeof Enemy | typeof Player | typeof Crew | typeof PlayerLeaderboard | typeof CrewLeaderboard;
export type EntityInstance = Pilot | Enemy | Player | Crew | PlayerLeaderboard | CrewLeaderboard;

export interface TypeormEntities {
    [key: string]: EntityConstructor;
}

