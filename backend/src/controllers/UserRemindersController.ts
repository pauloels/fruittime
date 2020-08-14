import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ListUserRemindersService from '../service/ListUserRemindersService';

export default class UserRemindersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const date = new Date();

        const parcedDate = format(subDays(date, 30), 'dd/MM/yyyy', {
            locale: ptBR,
        });

        const listReminder = container.resolve(ListUserRemindersService);

        const reminder = await listReminder.execute({
            date: parcedDate,
            user_id,
        });

        return response.json(classToClass(reminder));
    }
}
