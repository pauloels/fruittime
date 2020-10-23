import { getRepository, Repository, Raw } from 'typeorm';

import IRemindersRepository from './IRemindersRepository';
import ICreateReminderDTO from '../dtos/ICreateReminderDTO';

import Reminder from '../models/Reminder';
import IFindUserReminderByDate from '../dtos/IFindUserReminderByDateDTO';

class RemindersRepository implements IRemindersRepository {
    private ormRepository: Repository<Reminder>;

    // cria o meu Repositório
    constructor() {
        this.ormRepository = getRepository(Reminder);
    }

    public async findRemindersFromDate({
        user_id,
        date,
    }: IFindUserReminderByDate): Promise<Reminder[]> {
        const reminders = await this.ormRepository.find({
            relations: ['fruits'],
            where: {
                user_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'DD-MM-YYYY') >= '${date}'`,
                ),
            },
        });

        return reminders;
    }

    public async findByDate(date: Date): Promise<Reminder | undefined> {
        const findReminders = await this.ormRepository.findOne({
            where: { date },
        });

        return findReminders;
    }

    public async create({
        fruit,
        recurrent,
        date,
        user_id,
        fruit_id,
        avatar,
    }: ICreateReminderDTO): Promise<Reminder> {
        const reminder = this.ormRepository.create({
            fruit,
            recurrent,
            date,
            user_id,
            fruit_id,
            avatar,
        });

        const allReminders = date.map(d => ({
            ...reminder,
            date: d,
        }));

        await this.ormRepository.save(allReminders);

        return reminder;
    }

    public async delete(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    }
}

export default RemindersRepository;
