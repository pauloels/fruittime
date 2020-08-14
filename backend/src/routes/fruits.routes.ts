import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';
import uploadConfig from '../config/upload';
import FruitsController from '../controllers/FruitsController';
import FruitAvatarController from '../controllers/FruitAvatarController';

const fruitsRouter = Router();
const upload = multer(uploadConfig.multer);

const fruitsController = new FruitsController();
const fruitAvatarController = new FruitAvatarController();

fruitsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            fruit: Joi.string().required(),
            vitamins: Joi.string().required(),
        },
    }),
    fruitsController.create,
);

fruitsRouter.get('/', fruitsController.index);

// patch é para atualizar uma informação put para mais informações

fruitsRouter.patch(
    '/avatar/:fruit',
    upload.single('avatar'),
    fruitAvatarController.update,
);

export default fruitsRouter;
