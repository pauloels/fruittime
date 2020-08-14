import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
    driver: 's3' | 'disk';
    tmpFolder: string;
    uploadsFolder: string;
    uploadsFruit: string;
    multer: {
        storage: StorageEngine;
    };
    config: {
        disk: {};
        aws: {
            bucket: string;
        };
    };
}

export default {
    driver: process.env.STORAGE_DRIVER,
    // outros arquivos podem ter acesso ao caminho, assim não precisa fazer o import toda hora
    tmpFolder,
    uploadsFolder: path.resolve(tmpFolder, 'uploads'),
    uploadsFruit: path.resolve(tmpFolder, 'uploadsFruit'),

    multer: {
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename(request, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('hex');
                const fileName = `${fileHash}-${file.originalname}`;

                return callback(null, fileName);
            },
        }),
    },

    config: {
        disk: {},
        aws: {
            bucket: 'app-fruittime',
        },
    },
} as IUploadConfig;
