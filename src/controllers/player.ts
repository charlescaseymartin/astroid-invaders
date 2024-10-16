import { Crew, Pilot, Player } from '@entities/index';
import { findEntityOrThrow, updateEntity } from '../utils/typeorm';


export const getPlayer = async (playerId: string) => {
    const player = await findEntityOrThrow(Player, playerId);
    console.log({ player });
    return player;
}

export const updateName = async (playerId: string, name: string) => {
    const player = await updateEntity(Player, playerId, { name });
    console.log({ player });
    return player;
}

export const updateScore = async (playerId: string, score: number) => {
    const player = await updateEntity(Player, playerId, { score });
    console.log({ player });
    return player;
}

export const updatePilot = async (playerId: string, pilotId: string) => {
    const pilot = await findEntityOrThrow(Pilot, pilotId);
    const player = await updateEntity(Player, playerId, { pilot });
    console.log({ player });
    return player;
}

export const updateCrew = async (playerId: string, crewId: string) => {
    const crew = await findEntityOrThrow(Crew, crewId);
    const player = await updateEntity(Player, playerId, { crewId, crew });
    console.log({ player });
    return player;
}
