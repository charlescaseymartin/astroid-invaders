import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import PilotCrew from './pilotCrew';


@Entity()
class PilotCrewLeaderboard extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @OneToOne(() => PilotCrew)
    @JoinColumn()
    crew: PilotCrew;
}

export default PilotCrewLeaderboard;
