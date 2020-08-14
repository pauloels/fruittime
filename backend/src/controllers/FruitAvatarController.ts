import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateFruitAvatarService from '../service/UploadFruitAvatarService';

export default class FruitAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { fruit } = request.params;
        const updateFruitAvatarService = container.resolve(
            UpdateFruitAvatarService,
        );
        // executa user_id e avatarFilename que vira parametro para o service
        const fruits = await updateFruitAvatarService.execute({
            fruit,
            avatarFilename: request.file.filename,
        });

        return response.json(classToClass(fruits));
    }
}
