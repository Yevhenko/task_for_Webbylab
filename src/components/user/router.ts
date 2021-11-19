import express from 'express';
import * as userController from '../user/controller';

export const user = express.Router();

user.post('/user', userController.createUser);
