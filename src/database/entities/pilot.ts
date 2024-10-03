import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column
} from 'typeorm';
import { IsUUID, IsString, IsNumber, MaxLength } from 'class-validator';


@Entity()
class Pilot extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id: string;

    @Column({ type: 'varchar', length: 150 })
    @IsString()
    @MaxLength(150)
    name: string;

    @Column('text')
    @IsString()
    skin: string;

    @Column('integer')
    @IsNumber()
    speed: number;

    @Column('integer')
    @IsNumber()
    attack: number;

    @Column('integer')
    @IsNumber()
    defence: number;
}

export default Pilot;
