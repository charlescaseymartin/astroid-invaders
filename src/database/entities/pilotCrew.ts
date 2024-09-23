import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,

} from 'typeorm';
import Player from './player';

@Entity()
class PilotCrew extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 150 })
    name: string;

    @Column('integer')
    totalScore: number;

    @OneToOne(() => Player)
    @JoinColumn()
    playerOne: Player;

    @OneToOne(() => Player)
    @JoinColumn()
    playerTwo: Player;

    @OneToOne(() => Player)
    @JoinColumn()
    playerThree: Player;

    @OneToOne(() => Player)
    @JoinColumn()
    playerFour: Player;
}

export default PilotCrew;
