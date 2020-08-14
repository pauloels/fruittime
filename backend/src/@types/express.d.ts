// anexar uma nova tipagem no request do Express
// para usar no ensureAuthenticated o request.user.id
declare namespace Express {
    export interface Request {
        user: {
            id: string;
        };
    }
}
