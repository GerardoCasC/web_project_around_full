import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
  login,
} from '../controllers/users.js';
import { auth } from '../middleware/auth.js';

const usersRouter = Router();
usersRouter.get('/me', auth, getCurrentUser);
usersRouter.patch('/me', auth, updateUser);
usersRouter.patch('/me/avatar', auth, updateUserAvatar);
usersRouter.get('/', getUsers);
usersRouter.get('/:user_id', getUserById);
usersRouter.post('/signup', createUser);
usersRouter.post('/signin', login);

export { usersRouter };
