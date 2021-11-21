import express from 'express';
import * as authController from '../auth/controller';

export const auth = express.Router();

auth.post('/api/v1/sessions', authController.createSession);
