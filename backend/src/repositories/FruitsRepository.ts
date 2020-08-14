import { getRepository, Repository } from 'typeorm';

import IFruitsRepository from './IFruitsRepository';
import ICreateFruitDTO from '../dtos/ICreateFruitDTO';

import Fruit from '../models/Fruit';

class FruitsRepository implements IFruitsRepository {
    private ormRepository: Repository<Fruit>;

    // cria o meu Repositório
    constructor() {
        this.ormRepository = getRepository(Fruit);
    }

    public async findByName(fruit: string): Promise<Fruit | undefined> {
        const fruits = this.ormRepository.findOne({ where: { fruit } }); // ou ja pode ser { where: { id } }

        return fruits;
    }

    public async findById(id: string): Promise<Fruit | undefined> {
        const user = this.ormRepository.findOne(id); // ou ja pode ser { where: { id } }

        return user;
    }

    public async create(fruitData: ICreateFruitDTO): Promise<Fruit> {
        const fruits = this.ormRepository.create(fruitData);

        await this.ormRepository.save(fruits);

        return fruits;
    }

    public async save(fruits: Fruit): Promise<Fruit> {
        return this.ormRepository.save(fruits);
    }
}

export default FruitsRepository;
