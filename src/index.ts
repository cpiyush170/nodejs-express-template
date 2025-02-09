import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import validateEnv from '@/utils/validateEnv';
import router from '@/routers/routes';
import userRouter from './routers/users.routes';
import authRouter from './routers/auth.routes';
import errorMiddleware from './middlewares/error.middleware';
// App variables
dotenv.config();
validateEnv();
const port = process.env.PORT;

// App configurations

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(errorMiddleware);
// routes
app.use('/', router);
app.use('/', userRouter);
app.use('/', authRouter);

app.listen(port, () => {
  console.log('app is running at', port);
});
