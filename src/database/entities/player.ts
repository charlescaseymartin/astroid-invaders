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
    IsOptional,
    MaxLength
} from 'class-validator';
import Pilot from './pilot';
import Crew from './crew';


@Entity()
class Player extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @IsOptional()
    @IsUUID()
    id: string;

    @Column({ type: 'varchar', length: 150 })
    @IsOptional()
    @IsString()
    @MaxLength(150)
    name?: string;

    @Column('integer')
    @IsNumber()
    score: number;

    @OneToOne(() => Pilot)
    @IsOptional()
    @JoinColumn()
    pilot?: Pilot;

    @ManyToOne(() => Crew, crew => crew.players)
    @IsOptional()
    crew?: Crew;

    @Column()
    @IsOptional()
    @IsUUID()
    crewId?: string;

    @CreateDateColumn()
    @IsOptional()
    @IsDate()
    dateCreated: Date;
}

export default Player;
