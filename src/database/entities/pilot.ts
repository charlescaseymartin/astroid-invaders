import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column
} from 'typeorm';

@Entity()
class Pilot extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 150 })
    name: string;

    @Column('text')
    skin: string;

    @Column('integer')
    speed: number;

    @Column('integer')
    attack: number;

    @Column('integer')
    defence: number;
}

export default Pilot;
