import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserService from '../service/UpdateUserService';
import ShowProfileService from '../service/ShowProfileService';

export default class UsersController {
    public async show(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const showProfile = container.resolve(ShowProfileService);

        const user = await showProfile.execute({ user_id });

        delete user.password;

        return response.json(classToClass(user));
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const { name, email, old_password, password } = request.body;

        const updateUser = container.resolve(UpdateUserService);

        const user = await updateUser.execute({
            user_id,
            name,
            email,
            old_password,
            password,
        });

        delete user.password;

        return response.json(classToClass(user));
    }
}
