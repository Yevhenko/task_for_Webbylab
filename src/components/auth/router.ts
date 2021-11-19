import express from 'express';
import * as authController from '../auth/controller';

export const auth = express.Router();

auth.post('/sessions', authController.createSession);
