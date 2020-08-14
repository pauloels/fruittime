import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';
import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    // Validação do token JWT

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing.', 401);
    }

    // o token está assim = Bearer aklfjaklsfakljla temos que separar
    // [, token] pega só a segunda posição que eu quero e desconsidera a primeira/o split separa por espaço
    const [, token] = authHeader.split(' ');

    // para fazer a minha tratativa de erro pois ele retorna uma erro estranho

    try {
        const decoded = verify(token, authConfig.jwt.secret);
        // pega o id do usuário que está no sub do decoded
        // as força uma tipagem pois decoded veio como string | object
        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub,
        };

        // agora uma rota que usa esse middleware eu vou ter a informação do usuário

        return next();
    } catch (err) {
        throw new Error('Invalid JWT token');
    }
}
