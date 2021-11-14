import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { Actor } from '@components/film/interfaces';
import { Film } from '../../db/models/Film';

export const createFilm = async (data: Film): Promise<Film> => {
  const film = getRepository(Film).create(data);
  return await getRepository(Film).save(film);
};

export const getOneFilmById = async (filmId: number): Promise<Film | null> => {
  const film = await getRepository(Film).findOne({
    where: {
      filmId,
    },
  });

  if (!film) return null;

  return film;
};

export const getOneFilmByName = async (name: string): Promise<Film | null> => {
  const film = await getRepository(Film).findOne({
    where: {
      name,
    },
  });

  if (!film) return null;

  return film;
};

export const getOneFilmByActor = async (actor: Actor): Promise<Film | null> => {
  const filmRepo = getRepository(Film);
  const film = await filmRepo
    .createQueryBuilder('film')
    .where('film.listOfActors @> ARRAY[:listOfActors]', { listOfActors: actor })
    .getOne();
  if (!film) return null;

  return film;
};

export const removeFilm = async (id: number) => await getRepository(Film).delete(id);

export const getAllFilmsInAbcOrder = async (): Promise<Film[]> =>
  await getRepository(Film).find({
    order: {
      name: 'ASC',
    },
  });

export const importFile = async () => {
  const filePath = path.join(process.cwd(), 'uploads/sample_movies.txt');
  const promisifiedReadFile = promisify(fs.readFile);
  return await promisifiedReadFile(filePath);
};
