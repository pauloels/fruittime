import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';

import User from '../models/User';
import IHashUser from '../passwordHash/models/IHashUser';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashUser')
        private hashUser: IHashUser,
    ) {}

    public async execute({ email, password }: Request): Promise<Response> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatched = await this.hashUser.compareHash(
            password,
            user.password,
        );

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        // posso passar o mouse para ver se retorna uma promisse
        // sign({é um payload q o usuário tem acesso}, 'o segundo é um secret usar o md5 online para gerar', {configurações do token sempre tem q ter user.id, depois o tempo q ele fica logado})
        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
