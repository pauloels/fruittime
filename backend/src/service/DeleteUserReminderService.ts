import { injectable, inject } from 'tsyringe';

import IRemindersRepository from '../repositories/IRemindersRepository';

@injectable()
class DeleteUserReminderService {
    constructor(
        @inject('RemindersRepository')
        private remindersRepository: IRemindersRepository,
    ) {}

    public async execute(id: string): Promise<void> {
        await this.remindersRepository.delete(id);
    }
}

export default DeleteUserReminderService;
