import fs from 'fs'; // do node
import path from 'path';
import uploadConfig from '../../../../config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
    public async saveFile(file: string): Promise<string> {
        // fs.promise cria uma promise para usar o await para esperar a resp
        // rename é uma forma de mover o arquivo de um lado para o outro
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.uploadsFolder, file),
        );

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);

        try {
            await fs.promises.stat(filePath); // verifica se existe, caso não exista gera um err e cai no catch
        } catch {
            return;
        }

        // caso ele encontre não vai dar erro, assim a aplicação vai continuar aqui
        await fs.promises.unlink(filePath);
    }
}

export default DiskStorageProvider;
