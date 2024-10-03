import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Crew } from './index';
import { IsNumber } from 'class-validator';


@Entity()
class CrewLeaderboard extends BaseEntity {
    @PrimaryColumn()
    @IsNumber()
    id: number;

    @OneToOne(() => Crew)
    @JoinColumn()
    crew: Crew;
}

export default CrewLeaderboard;
