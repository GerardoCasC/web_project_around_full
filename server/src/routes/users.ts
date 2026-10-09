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
import { loginLimiter, registerLimiter } from '../middleware/limiter.js';
import { auth } from '../middleware/auth.js';

const usersRouter = Router();
usersRouter.get('/me', auth, getCurrentUser);
usersRouter.patch('/me', auth, updateUser);
usersRouter.patch('/me/avatar', auth, updateUserAvatar);
usersRouter.get('/', auth, getUsers);
usersRouter.get('/:user_id', auth, getUserById);
usersRouter.post('/signup', registerLimiter, createUser);
usersRouter.post('/signin', loginLimiter, login);

export { usersRouter };
