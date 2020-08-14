import { Router } from 'express';
import remindersRouter from './reminders.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import passwordRouter from './password.routes';
import profileRouter from './profile.routes';
import fruitsRouter from './fruits.routes';

const routes = Router();

routes.use('/reminders', remindersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/fruits', fruitsRouter);

export default routes;
