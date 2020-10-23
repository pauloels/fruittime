import Reminder from '../models/Reminder';
import ICreateReminderDTO from '../dtos/ICreateReminderDTO';
import IFindUserReminderByDate from '../dtos/IFindUserReminderByDateDTO';

export default interface IRemindersRepository {
    create(data: ICreateReminderDTO): Promise<Reminder>;
    findByDate(date: Date): Promise<Reminder | undefined>;
    findRemindersFromDate(data: IFindUserReminderByDate): Promise<Reminder[]>;
    delete(id: string): Promise<void>;
}
