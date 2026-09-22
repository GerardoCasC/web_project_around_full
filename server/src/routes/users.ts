import { Router } from 'express';
import {
  getUsers,
  getUserById,
  postUser,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
} from '../controllers/users.js';

const usersRouter = Router();
usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateUserAvatar);
usersRouter.get('/', getUsers);
usersRouter.get('/:user_id', getUserById);
usersRouter.post('/', postUser);

export { usersRouter };
