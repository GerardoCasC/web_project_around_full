import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw Object.assign(new Error('Se requiere un token de autorización'), {
      statusCode: 401,
    });
  }

  try {
    const token = authHeader.replace('Bearer ', '');

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      _id: string;
    };
    req.user = payload;
    next();
  } catch {
    throw Object.assign(new Error('Token inválido o expirado'), {
      statusCode: 401,
    });
  }
};
