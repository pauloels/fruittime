import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import RemindersController from '../controllers/RemindersController';
import UserRemindersController from '../controllers/UserRemindersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const remindersRouter = Router();
const remindersController = new RemindersController();
const userRemindersController = new UserRemindersController();

// como todas essas rotas precisam de autenticação eu posso importar antes de tudo, assim tudo que estiver a baixo vau usar o middleware
remindersRouter.use(ensureAuthenticated);
/**
remindersRouter.get('/', async (request, response) => {
    const reminders = await remindersRepository.find();

    return response.json(reminders);
});
 */
remindersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            fruit: Joi.string().required(),
            recurrent: Joi.boolean().required(),
            date: Joi.array().required(),
        },
    }),
    remindersController.create,
);
remindersRouter.get('/me', userRemindersController.index);

export default remindersRouter;
