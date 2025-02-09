import { HttpException } from '@/exceptions/HttpExceptions';
import { DataStoredInToken, RequestWithUser } from '@/interfaces/auth.interface';
import { NextFunction, Response } from 'express';
import * as dotenv from 'dotenv';
import { verify } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    if (Authorization) {
      const secretKey: string = process.env.SECRET_KEY;
      const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse.id;

      const users = new PrismaClient().user;
      const findUser = await users.findUnique({ where: { id: userId } });

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(401, 'Authentication token missing'));
    }
  } catch (e) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
