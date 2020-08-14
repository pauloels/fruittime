import { injectable, inject } from 'tsyringe';

import User from '../models/User';
import AppError from '../errors/AppError';
import IHashUser from '../passwordHash/models/IHashUser';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    // Dependency invertion coloco o constructor e retiro as dependencias do typeorm e agora uso o this
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashUser')
        private hashUser: IHashUser,
    ) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('E-mail address already used.');
        }

        const hashPassword = await this.hashUser.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashPassword,
        });

        return user;
    }
}

export default CreateUserService;
