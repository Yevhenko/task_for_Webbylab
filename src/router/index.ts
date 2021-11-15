import express from 'express';
import { filmRouter } from '@components/film';

export const router = express.Router();

router.use(filmRouter.film);
