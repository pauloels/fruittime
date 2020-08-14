import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from './IUserTokensRepository';
import UserToken from '../models/UserToken';

class UserTokensRepository implements IUserTokensRepository {
    private ormRepository: Repository<UserToken>;

    // cria o meu Repositório
    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = this.ormRepository.findOne({ where: { token } });

        return userToken;
    }

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = this.ormRepository.create({
            user_id,
        });

        await this.ormRepository.save(userToken);

        return userToken;
    }
}

export default UserTokensRepository;
