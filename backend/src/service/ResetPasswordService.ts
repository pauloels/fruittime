import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashUser from '../passwordHash/models/IHashUser';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import AppError from '../errors/AppError';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        @inject('HashUser')
        private hashUser: IHashUser,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exists');
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exists');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(tokenCreatedAt, compareDate)) {
            throw new AppError('Token expired.');
        }

        user.password = await this.hashUser.generateHash(password);

        await this.usersRepository.save(user);
    }
}

export default ResetPasswordService;
