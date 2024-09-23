import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import Player from './player';


@Entity()
class PilotLeaderboard {
    @PrimaryColumn()
    id: number;

    @OneToOne(() => Player)
    @JoinColumn()
    player: Player;
}

export default PilotLeaderboard;
