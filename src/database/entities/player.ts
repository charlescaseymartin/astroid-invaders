import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import {
    IsUUID,
    IsString,
    IsNumber,
    IsDate,
    MaxLength
} from 'class-validator';
import Pilot from './pilot';
import Crew from './crew';


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

    @ManyToOne(() => Crew, crew => crew.players)
    crew: Crew;

    @Column()
    @IsUUID()
    crewId: string;

    @CreateDateColumn()
    @IsDate()
    dateCreated: Date;
}

export default Player;
