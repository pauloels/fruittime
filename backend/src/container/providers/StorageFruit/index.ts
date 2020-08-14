import { container } from 'tsyringe';

import uploadConfig from '../../../config/upload';

import IStorageFruit from './models/IStorageFruit';

import DiskStorageFruit from './implementations/DiskStorageFruit';
import S3StorageFruit from './implementations/S3StorageFruit';

const providers = {
    disk: DiskStorageFruit,
    s3: S3StorageFruit,
};

container.registerSingleton<IStorageFruit>(
    'StorageFruit',
    providers[uploadConfig.driver],
);
