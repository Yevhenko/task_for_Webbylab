import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { IFilm } from '@components/film/interfaces';
import { Film } from '../../db/models/Film';

export const createFilm = async (data: IFilm): Promise<IFilm> => {
  const film = getRepository(Film).create(data);
  return await getRepository(Film).save(film);
};

export const getOneFilmById = async (filmId: number): Promise<IFilm | null> => {
  const film = await getRepository(Film).findOne({
    where: {
      id: filmId,
    },
  });

  if (!film) return null;

  return film;
};

export const updateMovie = async (filmId: number, data: IFilm): Promise<IFilm | null> => {
  const filmRepo = await getRepository(Film);
  const film = await filmRepo.findOne({ where: { id: filmId } });

  if (!film) return null;

  filmRepo.merge(film, data);

  await filmRepo.save(film);

  const updated = await filmRepo.findOne({ where: { id: filmId } });

  if (!updated) return null;

  return updated;
};

export const getOneFilmByName = async (name: string): Promise<IFilm | null> => {
  const film = await getRepository(Film).findOne({
    where: {
      title: name,
    },
  });

  if (!film) return null;

  return film;
};

export const getOneFilmByActor = async (actor: string): Promise<IFilm | null> => {
  const filmRepo = getRepository(Film);
  const film = await filmRepo
    .createQueryBuilder('film')
    .where(`film.listOfActors ::jsonb @> :listOfActors`, {
      listOfActors: JSON.stringify([actor]),
    })
    .getOne();
  if (!film) return null;

  return film;
};

export const removeFilm = async (filmId: number) => await getRepository(Film).delete({ id: filmId });

export const getAllFilmsInAbcOrder = async (
  offset: number,
  limit: number,
  order: 'ASC' | 'DESC',
  sort: 'year' | 'id' | 'title',
): Promise<IFilm[]> => {
  const filmRepo = await getRepository(Film);

  return await filmRepo
    .createQueryBuilder('post')
    .skip(offset ?? 0)
    .take(limit ?? 20)
    .orderBy(sort ?? 'id', order ?? 'ASC')
    .getMany();
};

export const importFile = async (filePath: string) => {
  const promisifiedReadFile = promisify(fs.readFile);
  const data = await promisifiedReadFile(filePath, { encoding: 'utf8', flag: 'r' });

  const people = data.split(/\r?\n/).filter((e) => e.length > 4);

  const result = [];
  for (let i = 0; i < people.length; i += 2) {
    result.push([people[i], people[i + 1], people[i + 2], people[i + 3]]);
  }

  return result;
};
