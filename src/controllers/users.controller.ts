import UserService from '@/services/users.service';
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { CreateUserDto } from '@/dtos/users.dto';
import { validate } from 'class-validator';
import { CreateUserResponse } from '@/interfaces/users.interface';

class UsersController {
  public userService = new UserService();
  public getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users: User[] = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  };

  public getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user: User | null = await this.userService.getUserById(id);
      if (user) res.status(200).json(user);
      else res.status(404).send('User not found');
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  };
  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const createUserDto = new CreateUserDto();
      createUserDto.email = req.body.email;
      createUserDto.name = req.body.name;

      const errors = await validate(createUserDto);
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      const user: User = req.body;
      const newUser: User = await this.userService.createUser(user);
      const { email, name } = newUser;
      const createUserResponse: CreateUserResponse = { email, name };
      res.status(201).json({ user: createUserResponse });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
  public updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data: User = req.body;
      const updatedUser: User = await this.userService.updateUser(id, data);
      res.status(200).json({ user: updatedUser });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedUser: User = await this.userService.deleteUser(id);
      res.status(200).json({ user: deletedUser });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
}

export default UsersController;
