// Importation avec ES Modules
import express from 'express';
import { login, register } from './routes/userControllers.js';

// Création et export direct du router
const apiRouter = express.Router();

apiRouter.post('/users/register', register);
apiRouter.post('/users/login', login);

export default apiRouter;
