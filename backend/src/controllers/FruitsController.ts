import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateFruitsService from '../service/CreateFruitsService';
import ListFruitsService from '../service/ListFruitsService';

export default class FruitsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { fruit } = request.query;

        const listFruits = container.resolve(ListFruitsService);

        const fruits = await listFruits.execute({ fruit });

        return response.json(classToClass(fruits));
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { fruit, vitamins } = request.body;

        const createFruits = container.resolve(CreateFruitsService);

        const fruits = await createFruits.execute({
            fruit,
            vitamins,
        });

        return response.json(classToClass(fruits));
    }
}
