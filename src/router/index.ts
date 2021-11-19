import express from 'express';
import { filmRouter } from '@components/film';
import { userRouter } from '@components/user';
import { authRouter } from '@components/auth';
import { mv } from '@components/auth/middleware';

export const router = express.Router();

router.use(userRouter.user);
router.use(authRouter.auth);
router.use(mv);
router.use(filmRouter.film);
