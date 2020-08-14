import { container } from 'tsyringe';

import IHashUser from './models/IHashUser';
import BCryptHashUser from './implementations/BCryptHashUser';

container.registerSingleton<IHashUser>('HashUser', BCryptHashUser);
