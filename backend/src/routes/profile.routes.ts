import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ProfileCotroller from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileCotroller = new ProfileCotroller();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileCotroller.show);
profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.string(),
            password_confirmation: Joi.string().valid(Joi.ref('password')),
        },
    }),
    profileCotroller.update,
);

export default profileRouter;
