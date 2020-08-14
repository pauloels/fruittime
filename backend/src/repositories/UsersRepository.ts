import { getRepository, Repository } from 'typeorm';

import IUsersRepository from './IUsersRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

import User from '../models/User';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    // cria o meu Repositório
    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = this.ormRepository.findOne(id); // ou ja pode ser { where: { id } }

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = this.ormRepository.findOne({ where: { email } });

        return user;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(userData);

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;
