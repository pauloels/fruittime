import { injectable, inject } from 'tsyringe';

import AppError from '../errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../models/User';

interface Request {
    user_id: string;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ user_id }: Request): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        return user;
        console.log(user);
    }
}

export default ShowProfileService;
