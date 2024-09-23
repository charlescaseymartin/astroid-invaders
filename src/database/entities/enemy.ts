import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
class Enemy extends BaseEntity {
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

export default Enemy;
