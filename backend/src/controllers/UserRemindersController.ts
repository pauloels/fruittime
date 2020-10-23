import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ListUserRemindersService from '../service/ListUserRemindersService';
import DeleteUserReminderService from '../service/DeleteUserReminderService';

export default class UserRemindersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const date = new Date();

        /** const parcedDate = format(subDays(date, 30), 'dd/MM/yyyy', {
            locale: ptBR,
        }); */

        const useDate = format(date.setDate(date.getDate() - 1), 'dd/MM/yyyy', {
            locale: ptBR,
        });

        const listReminder = container.resolve(ListUserRemindersService);

        const reminder = await listReminder.execute({
            date: useDate,
            user_id,
        });

        return response.json(classToClass(reminder));
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.query;
        const deleteUserReminderService = container.resolve(
            DeleteUserReminderService,
        );

        if (id) {
            await deleteUserReminderService.execute(id as string);
        }

        return response.send();
    }
}
