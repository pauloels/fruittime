import { injectable, inject } from 'tsyringe';

// import { format } from 'date-fns';
import Reminder from '../models/Reminder';
import IRemindersRepository from '../repositories/IRemindersRepository';
import ICacheProvider from '../container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
    user_id: string;
    date: string;
}

@injectable() // toda class que tem injeção de dependência deve ter o injectable como decorator
class ListUserRemindersService {
    constructor(
        @inject('RemindersRepository') // dependency injection
        private remindersRepository: IRemindersRepository, // independency invertion

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({ user_id, date }: IRequest): Promise<Reminder[]> {
        /** const newDate = new Date();
        const useDate = format(
            newDate.setDate(newDate.getDate() - 1),
            'dd/MM/yyyy',
        ); */

        const cacheKey = `user-reminders:${user_id}`;

        let reminders = await this.cacheProvider.recover<Reminder[]>(cacheKey);

        if (!reminders) {
            reminders = await this.remindersRepository.findRemindersFromDate({
                user_id,
                date,
            });

            console.log('Buscou do banco');

            await this.cacheProvider.save(cacheKey, reminders);
        }

        return reminders;
    }
}

export default ListUserRemindersService;
