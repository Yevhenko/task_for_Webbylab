import { Request, Response } from 'express';
import * as userService from '@components/user/service';
import * as jwt from 'jsonwebtoken';
import { accessSecret } from '@config/index';

export const createSession = async (req: Request, res: Response) => {
  const {
    body: { email, password },
  } = req;

  if (!email || !password) return res.sendStatus(400);

  const oldUser = await userService.getUser(email);

  if (oldUser === null)
    return res.status(400).json({
      status: 0,
      message: 'Create user please',
    });

  const user = await userService.getUser(email);

  if (user!.password !== password)
    return res.status(403).json({
      status: 0,
      error: {
        fields: {
          email: 'AUTHENTICATION_FAILED',
          password: 'AUTHENTICATION_FAILED',
        },
        code: 'AUTHENTICATION_FAILED',
      },
    });

  const token = jwt.sign({ password }, accessSecret, { expiresIn: 36000 });

  res.status(200).json({ token, status: 1 });
};
