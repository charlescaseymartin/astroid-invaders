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

@Entity()
class Player extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 150 })
    name: string;

    @Column('integer')
    score: number;

    @OneToOne(() => Pilot)
    @JoinColumn()
    pilot: Pilot;

    @CreateDateColumn({ type: 'timestamptz' })
    dateCreated: Date;
}

export default Player;
