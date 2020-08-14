import { Request, Response } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateRemindersService from '../service/CreateRemindersService';

export default class RemindersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const { fruit, recurrent, date } = request.body;

        const parcedDate = date.map((d: string) => {
            return startOfHour(parseISO(d));
        });

        const createReminder = container.resolve(CreateRemindersService);

        const reminder = await createReminder.execute({
            fruit,
            recurrent,
            date: parcedDate,
            user_id,
            fruit_id: '',
            avatar: '',
        });

        return response.json(classToClass(reminder));
    }
}
