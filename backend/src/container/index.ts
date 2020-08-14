import { container } from 'tsyringe';

import '../passwordHash';
import './providers';

import IRemindersRepository from '../repositories/IRemindersRepository';
import RemindersRepository from '../repositories/RemindersRepository';

import IUsersRepository from '../repositories/IUsersRepository';
import UsersRepository from '../repositories/UsersRepository';

import IUserTokensRepository from '../repositories/IUserTokensRepository';
import UserTokensRepository from '../repositories/UserTokensRepository';

import IFruitsRepository from '../repositories/IFruitsRepository';
import FruitsRepository from '../repositories/FruitsRepository';

container.registerSingleton<IRemindersRepository>(
    'RemindersRepository', // id de referencia, pode ser qualquer coisa, padrão mesmo nome do repo
    RemindersRepository, // repo que quero injetar
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
    'UserTokensRepository',
    UserTokensRepository,
);

container.registerSingleton<IFruitsRepository>(
    'FruitsRepository',
    FruitsRepository,
);
