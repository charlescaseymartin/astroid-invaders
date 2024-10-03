import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';
import Pilot from './pilot';
import { IsUUID, IsString, IsNumber, IsDate, MaxLength } from 'class-validator';


@Entity()
class Player extends BaseEntity {
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

    @OneToOne(() => Pilot)
    @JoinColumn()
    pilot: Pilot;

    @CreateDateColumn()
    @IsDate()
    dateCreated: Date;
}

export default Player;
