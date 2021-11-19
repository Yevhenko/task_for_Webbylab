import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as userService from './service';
import { accessSecret } from '@config/index';

export const createUser = async (req: Request, res: Response) => {
  const {
    body: { name, email, password, confirmPassword },
  } = req;

  if (!name || !email || !password || !confirmPassword) return res.sendStatus(400);

  const oldUser = await userService.getUser(email);

  if (oldUser !== null)
    return res.status(400).json({
      status: 0,
      error: {
        fields: {
          email: 'NOT_UNIQUE',
        },
        code: 'EMAIL_NOT_UNIQUE',
      },
    });

  await userService.buildUser({ name, email, password, confirmPassword });

  const token = jwt.sign({ password }, accessSecret, { expiresIn: 36000 });
  res.status(200).json({ token, status: 1 });
};
