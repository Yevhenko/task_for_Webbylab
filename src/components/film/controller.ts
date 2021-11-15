import { Request, Response } from 'express';
import * as filmService from './service';

export const addNewFilm = async (req: Request, res: Response) => {
  const {
    body: { name, productionYear, formatOfMovie, listOfActors },
  } = req;

  if (!name || !productionYear || !formatOfMovie || !listOfActors) return res.sendStatus(400);

  const newFilm = await filmService.createFilm({ name, productionYear, formatOfMovie, listOfActors });

  !newFilm
    ? res.sendStatus(501)
    : res.status(200).json({
        name: newFilm.name,
        productionYear: newFilm.productionYear,
        formatOfMovie: newFilm.formatOfMovie,
        listOfActors: newFilm.listOfActors,
      });
};

export const getFilmById = async (req: Request, res: Response) => {
  const { params } = req;

  if (!params.filmId) return res.sendStatus(400);

  const film = await filmService.getOneFilmById(+params.filmId);

  !film
    ? res.sendStatus(404)
    : res.status(200).json({
        name: film.name,
        productionYear: film.productionYear,
        formatOfMovie: film.formatOfMovie,
        listOfActors: film.listOfActors,
      });
};

export const getFilmByName = async (req: Request, res: Response) => {
  const { params } = req;

  if (!params.name) return res.sendStatus(400);

  console.log(params);
  const film = await filmService.getOneFilmByName(params.name);

  !film
    ? res.sendStatus(404)
    : res.status(200).json({
        name: film.name,
        productionYear: film.productionYear,
        formatOfMovie: film.formatOfMovie,
        listOfActors: film.listOfActors,
      });
};

export const getFilmByActor = async (req: Request, res: Response) => {
  const {
    body: { firstName, lastName },
  } = req;

  if (!firstName || !lastName) return res.sendStatus(400);

  const film = await filmService.getOneFilmByActor({ firstName, lastName });

  !film
    ? res.sendStatus(404)
    : res.status(200).json({
        name: film.name,
        productionYear: film.productionYear,
        formatOfMovie: film.formatOfMovie,
        listOfActors: film.listOfActors,
      });
};

export const getAllFilms = async (req: Request, res: Response) => {
  const films = await filmService.getAllFilmsInAbcOrder();

  !films
    ? res.sendStatus(404)
    : res.status(200).json(
        films.map((film) => ({
          name: film.name,
          productionYear: film.productionYear,
          formatOfMovie: film.formatOfMovie,
          listOfActors: film.listOfActors,
        })),
      );
};

export const deleteFilm = async (req: Request, res: Response) => {
  const { params } = req;

  !params.filmId ? res.sendStatus(400) : await filmService.removeFilm(+params.filmId);

  res.sendStatus(200);
};

export const importFilmData = async (req: Request, res: Response) => {
  const data = await filmService.importFile();

  !data ? res.sendStatus(400) : res.status(200).json(data);
};
