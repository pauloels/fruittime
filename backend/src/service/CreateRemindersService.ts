import { injectable, inject } from 'tsyringe';

import Reminder from '../models/Reminder';
import IRemindersRepository from '../repositories/IRemindersRepository';
import IFruitsRepository from '../repositories/IFruitsRepository';
import AppError from '../errors/AppError';
import ICacheProvider from '../container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
    fruit: string;
    recurrent: boolean;
    date: Date[];
    user_id: string;
    fruit_id: string;
    avatar: string;
}

@injectable() // toda class que tem injeção de dependência deve ter o injectable como decorator
class CreateRemindersService {
    constructor(
        @inject('RemindersRepository') // dependency injection
        private remindersRepository: IRemindersRepository, // independency invertion

        @inject('FruitsRepository')
        private fruitsRepository: IFruitsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        fruit,
        recurrent,
        date,
        user_id,
        fruit_id,
        avatar,
    }: IRequest): Promise<Reminder> {
        const findFruit = await this.fruitsRepository.findByName(fruit);

        if (!findFruit) {
            throw new AppError('Fruit not found');
        }

        const reminder = await this.remindersRepository.create({
            avatar: findFruit.avatar,
            fruit: findFruit.fruit,
            fruit_id: findFruit.id,
            recurrent,
            date,
            user_id,
        });

        await this.cacheProvider.invalidate(`user-reminders:${user_id}`);

        return reminder;
    }
}

export default CreateRemindersService;
