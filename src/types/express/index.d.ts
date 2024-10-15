import { Player } from './database/entities';


declare global {
    namespace Express {
        export interface Request {
            player: Player;
        }
    }
}
