import { injectable, inject } from 'tsyringe';

import Fruit from '../models/Fruit';
import IFruitsRepository from '../repositories/IFruitsRepository';
import AppError from '../errors/AppError';

interface IRequest {
    fruit: string;
}

@injectable() // toda class que tem injeção de dependência deve ter o injectable como decorator
class ListFruitsService {
    constructor(
        @inject('FruitsRepository') // dependency injection
        private fruitsRepository: IFruitsRepository, // independency invertion
    ) {}

    public async execute({ fruit }: IRequest): Promise<Fruit> {
        const fruits = await this.fruitsRepository.findByName(fruit);

        if (!fruits) {
            throw new AppError('Fruit not found');
        }

        return fruits;
    }
}

export default ListFruitsService;
