import { injectable, inject } from 'tsyringe';

import Fruit from '../models/Fruit';
import AppError from '../errors/AppError';
import IFruitsRepository from '../repositories/IFruitsRepository';

interface IRequest {
    fruit: string;
    vitamins: string;
}

@injectable()
class CreateFruitService {
    // Dependency invertion coloco o constructor e retiro as dependencias do typeorm e agora uso o this
    constructor(
        @inject('FruitsRepository')
        private fruitsRepository: IFruitsRepository,
    ) {}

    public async execute({ fruit, vitamins }: IRequest): Promise<Fruit> {
        const checkFruitExists = await this.fruitsRepository.findByName(fruit);

        if (checkFruitExists) {
            throw new AppError('Fruit already exists.');
        }

        const fruits = await this.fruitsRepository.create({
            fruit,
            vitamins,
        });

        return fruits;
    }
}

export default CreateFruitService;
