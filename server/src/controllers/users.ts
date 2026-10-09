import type { RequestHandler } from 'express';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// GET /users
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
  if (user._id.toString() !== req.user?._id?.toString()) {
    res
      .status(200)
      .json({ name: user.name, about: user.about, avatar: user.avatar });
    return;
  }
  res.status(200).json({
    name: user.name,
    about: user.about,
    avatar: user.avatar,
    email: user.email,
    _id: user._id,
  });
};

export const getUserById: RequestHandler = async (req, res) => {
  const user = await User.findById(req.params.user_id);

  if (!user) {
    throw Object.assign(new Error('No se encontró ningún usuario con ese id'), {
      statusCode: 404,
    });
  }
  if (user._id.toString() !== req.user?._id?.toString()) {
    res
      .status(200)
      .json({ name: user.name, about: user.about, avatar: user.avatar });
    return;
  }
  res.status(200).json({
    name: user.name,
    about: user.about,
    avatar: user.avatar,
    email: user.email,
  });
};

// PATCH /users

export const updateUser: RequestHandler = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user?._id, req.body, {
    returnDocument: 'after',
  });
  if (!user) {
    throw Object.assign(new Error('No se encontró ningún usuario con ese id'), {
      statusCode: 404,
    });
  }
  if (user._id.toString() !== req.user?._id?.toString()) {
    res
      .status(403)
      .json({ message: 'No tienes permiso para actualizar este usuario' });
    return;
  }
  res.status(200).json({
    name: user.name,
    about: user.about,
    avatar: user.avatar,
    email: user.email,
  });
};

export const updateUserAvatar: RequestHandler = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { avatar: req.body.avatar },
    { returnDocument: 'after' },
  );
  if (!user) {
    throw Object.assign(new Error('No se encontró ningún usuario con ese id'), {
      statusCode: 404,
    });
  }
  res.status(200).json(user);
};

// POST /users

export const createUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw Object.assign(new Error('Email y contraseña son requeridos'), {
      statusCode: 400,
    });
  }
  if (password.length < 8) {
    throw Object.assign(
      new Error('La contraseña debe tener al menos 8 caracteres'),
      { statusCode: 400 },
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ email: user.email, _id: user._id });
  } catch (err: unknown) {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      throw Object.assign(new Error('Este email ya está en uso'), {
        statusCode: 400,
      });
    }
    throw err;
  }
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw Object.assign(new Error('Email y contraseña son requeridos'), {
      statusCode: 400,
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw Object.assign(new Error('Usuario o contraseña incorrectos'), {
      statusCode: 401,
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw Object.assign(new Error('Usuario o contraseña incorrectos'), {
      statusCode: 401,
    });
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });
  res.status(200).json({ email: user.email, user_id: user._id, token });
};
