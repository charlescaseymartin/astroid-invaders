import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { database } from '../database';
import {
    Pilot,
    Enemy,
    Player,
    Crew,
    PlayerLeaderboard,
    CrewLeaderboard
} from '../database/entities';
import { EntityNotFoundError, BadUserInputError } from './errors';
import { EntityConstructor, EntityInstance, TypeormEntities } from 'src/types';
import { validate } from 'class-validator';
import { DeepPartial } from 'typeorm';


const entities: TypeormEntities = {
    Pilot,
    Enemy,
    Player,
    Crew,
    PlayerLeaderboard,
    CrewLeaderboard
};

export const findEntityOrThrow = async <T extends EntityConstructor>(
    Constructor: T,
    id: number | string,
    options?: FindOneOptions<T>,
): Promise<InstanceType<T>> => {
    const repo = database.getRepository(Constructor);
    const idString = id.toString();

    const instance = options ?
        await repo.findOneBy({ id: idString, ...options }) :
        await repo.findOneBy({ id: idString });

    if (!instance) throw new EntityNotFoundError(Constructor.name);

    return instance as InstanceType<T>;
}

export const validateAndSaveEntity = async <T extends EntityInstance>(instance: T): Promise<T> => {
    const errors = await validate(instance);
    if (errors.length > 0) throw new BadUserInputError({ field: errors });
    return database.manager.save(instance) as Promise<T>;
}

export const createEntity = async <T extends EntityConstructor>(
    Constructor: T,
    input: DeepPartial<T>
): Promise<InstanceType<T>> => {
    const instance = new Constructor();
    Object.assign(instance, input);
    return await validateAndSaveEntity(instance as InstanceType<T>);
}

export const updateEntity = async <T extends EntityConstructor>(
    Constructor: T,
    id: number | string,
    input: Partial<InstanceType<T>>
): Promise<InstanceType<T>> => {
    const instance = await findEntityOrThrow(Constructor, id);
    Object.assign(instance, input);
    return await validateAndSaveEntity(instance);
}

export const deleteEntity = async <T extends EntityConstructor>(
    Constructor: T,
    id: number | string
): Promise<InstanceType<T>> => {
    const instance = await findEntityOrThrow(Constructor, id);
    await database.manager.remove(instance);
    return instance;
}
