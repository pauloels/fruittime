import { injectable, inject } from 'tsyringe';

import AppError from '../errors/AppError';
import Fruit from '../models/Fruit';
import IFruitsRepository from '../repositories/IFruitsRepository';
import IStorageFruit from '../container/providers/StorageFruit/models/IStorageFruit';

interface Request {
    fruit: string;
    avatarFilename: string;
}

@injectable()
class UpdateFruitAvatarService {
    constructor(
        @inject('FruitsRepository')
        private fruitsRepository: IFruitsRepository,

        @inject('StorageFruit')
        private storageFruit: IStorageFruit,
    ) {}

    public async execute({ fruit, avatarFilename }: Request): Promise<Fruit> {
        const fruits = await this.fruitsRepository.findByName(fruit);

        if (!fruits) {
            throw new AppError(
                'Only authenticated users can change avatar',
                401,
            );
        }

        if (fruits.avatar) {
            await this.storageFruit.deleteFile(fruits.avatar);
        }

        const filename = await this.storageFruit.saveFile(avatarFilename);

        fruits.avatar = filename;

        // o save ele verifica se o user existe, se não existe ele cria um user e se existe ele atualiza o user
        await this.fruitsRepository.save(fruits);

        return fruits;
    }
}

export default UpdateFruitAvatarService;
