import { injectable, inject } from 'tsyringe';

import AppError from '../errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashUser from '../passwordHash/models/IHashUser';
import User from '../models/User';

interface Request {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

@injectable()
class UpdateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashUser')
        private hashUser: IHashUser,
    ) {}

    public async execute({
        user_id,
        name,
        email,
        old_password,
        password,
    }: Request): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        const userWithUpdatedEmail = await this.usersRepository.findByEmail(
            email,
        );

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
            throw new AppError('E-mail already in use.');
        }

        user.name = name;
        user.email = email;

        if (password && !old_password) {
            throw new AppError(
                'You have to inform the old password to set a new password',
            );
        }

        if (password && old_password) {
            const checkOldPassword = await this.hashUser.compareHash(
                old_password,
                user.password,
            );

            if (!checkOldPassword) {
                throw new AppError('Old password does not match.');
            }

            user.password = await this.hashUser.generateHash(password);
        }

        return this.usersRepository.save(user);
    }
}

export default UpdateUserService;
