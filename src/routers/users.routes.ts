import { Router } from 'express';
import UsersController from '@/controllers/users.controller';
import authMiddleware from '@/middlewares/auth.middleware';

const userRouter = Router();
const userController = new UsersController();

userRouter.get('/users',authMiddleware, userController.getUsers);
userRouter.get('/users/:id', authMiddleware, userController.getUserById);
userRouter.post('/users', userController.createUser);
userRouter.put('/users/:id',authMiddleware, userController.updateUser);
userRouter.delete('/users/:id',authMiddleware, userController.deleteUser);

export default userRouter;
