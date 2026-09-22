import type { RequestHandler } from 'express';
import { User } from '../models/user.js';

export const getUsers: RequestHandler = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

export const getCurrentUser: RequestHandler = async (req, res) => {
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw Object.assign(new Error('No se encontró ningún usuario con ese id'), {
      statusCode: 404,
    });
  }

  res.status(200).json(user);
};

export const getUserById: RequestHandler = async (req, res) => {
  const user = await User.findById(req.params.user_id);

  if (!user) {
    throw Object.assign(new Error('No se encontró ningún usuario con ese id'), {
      statusCode: 404,
    });
  }
  res.status(200).json(user);
};

export const postUser: RequestHandler = async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
};

export const updateUser: RequestHandler = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user?._id, req.body, {
    new: true,
  });
  if (!user) {
    throw Object.assign(new Error('No se encontró ningún usuario con ese id'), {
      statusCode: 404,
    });
  }
  res.status(200).json(user);
};

export const updateUserAvatar: RequestHandler = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { avatar: req.body.avatar },
    { new: true },
  );
  if (!user) {
    throw Object.assign(new Error('No se encontró ningún usuario con ese id'), {
      statusCode: 404,
    });
  }
  res.status(200).json(user);
};
