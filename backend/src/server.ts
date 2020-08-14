import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database'; // para conectar o typeorm
import './container'; // para funcionar as injeções de dependência

const app = express();

app.use(cors());
app.use(express.json()); // para a aplicação entender formato json

app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use('/files', express.static(uploadConfig.uploadsFruit));

app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    // quando a váriavel for "_" eu falo pro eslint desconciderar
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err);

    return response.status(500).json({
        status: 'erros',
        message: 'Internal server error',
    });
});

app.listen(3333, () => {
    console.log('Server started on port 3333!');
});
