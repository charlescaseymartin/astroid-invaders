import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import Player from './player';
import { IsNumber } from 'class-validator';


@Entity()
class PlayerLeaderboard {
    @PrimaryColumn()
    @IsNumber()
    id: number;

    @OneToOne(() => Player)
    @JoinColumn()
    player: Player;
}

export default PlayerLeaderboard;
