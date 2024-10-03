import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import Player from './player';
import { IsUUID, IsString, IsNumber, IsDate, MaxLength } from 'class-validator';


@Entity()
class PilotCrew extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id: string;

    @Column({ type: 'varchar', length: 150 })
    @IsString()
    @MaxLength(150)
    name: string;

    @Column('integer')
    @IsNumber()
    score: number;

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

    @CreateDateColumn()
    @IsDate()
    dateCreated: Date;
}

export default PilotCrew;
