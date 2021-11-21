import * as jwt from 'jsonwebtoken';

import { accessSecret } from '@config/index';
import { NextFunction, Request, Response } from 'express';

export const mv = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token === undefined || token === null)
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

  jwt.verify(token, accessSecret, (err, data) => {
    if (err)
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
    return next();
  });
};
