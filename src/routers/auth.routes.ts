import AuthController from '@/controllers/auth.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/signup', authController.signUp);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authMiddleware, authController.logOut);

export default authRouter;
