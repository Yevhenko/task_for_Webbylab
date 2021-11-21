import express from 'express';
import { filmRouter } from '@components/film';
import { userRouter } from '@components/user';
import { authRouter, authMiddleware } from '@components/auth';

export const router = express.Router();

router.use(userRouter.user);
router.use(authRouter.auth);
router.use(authMiddleware.mv);
router.use(filmRouter.film);
