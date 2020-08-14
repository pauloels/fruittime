import { injectable, inject } from 'tsyringe';

import AppError from '../errors/AppError';
import User from '../models/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '../container/providers/StorageProvider/models/IStorageProvider';

interface Request {
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar',
                401,
            );
        }

        if (user.avatar) {
            await this.storageProvider.deleteFile(user.avatar);
        }

        const filename = await this.storageProvider.saveFile(avatarFilename);

        user.avatar = filename;

        // o save ele verifica se o user existe, se não existe ele cria um user e se existe ele atualiza o user
        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
