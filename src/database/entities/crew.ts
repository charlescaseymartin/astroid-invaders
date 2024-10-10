import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import Player from './player';
import { IsUUID, IsString, IsNumber, IsDate, MaxLength } from 'class-validator';


@Entity()
class Crew extends BaseEntity {
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

    @OneToMany(() => Player, player => player.crew)
    players: Player[];

    @CreateDateColumn()
    @IsDate()
    dateCreated: Date;
}

export default Crew;
