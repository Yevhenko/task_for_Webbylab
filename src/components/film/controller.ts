import { Request, Response } from 'express';
import * as filmService from './service';
import { importFile } from './service';

export const addNewFilm = async (req: Request, res: Response) => {
  const {
    body: { title, year, format: formatOfMovie, actors: listOfActors },
  } = req;

  if (!title || !year || !formatOfMovie || !listOfActors) return res.sendStatus(400);

  const oldFilm = await filmService.getOneFilmByName(title);

  if (oldFilm)
    return res.json({
      status: 0,
      error: {
        fields: {
          title: 'NOT_UNIQUE',
        },
        code: 'MOVIE_EXISTS',
      },
    });

  const newFilm = await filmService.createFilm({ title, year, formatOfMovie, listOfActors });

  !newFilm
    ? res.sendStatus(501)
    : res.status(200).json({
        title: newFilm.title,
        year: newFilm.year,
        formatOfMovie: newFilm.formatOfMovie,
        listOfActors: newFilm.listOfActors,
      });
};

export const getFilmById = async (req: Request, res: Response) => {
  const { params } = req;

  if (!params.filmId) return res.sendStatus(400);

  const film = await filmService.getOneFilmById(+params.filmId);

  !film
    ? res.status(404).json({
        status: 0,
        error: {
          fields: 'id',
          code: 'MOVIE_NOT_FOUND',
        },
      })
    : res.status(200).json({
        data: {
          title: film.title,
          year: film.year,
          format: film.formatOfMovie,
          actors: film.listOfActors,
          status: 1,
        },
      });
};

export const getFilmByName = async (req: Request, res: Response) => {
  const { params } = req;

  if (!params.name) return res.sendStatus(400);

  const film = await filmService.getOneFilmByName(params.name);

  !film
    ? res.status(404).json({
        status: 0,
        error: {
          fields: 'title',
          code: 'MOVIE_NOT_FOUND',
        },
      })
    : res.status(200).json({
        data: {
          title: film.title,
          year: film.year,
          format: film.formatOfMovie,
          actors: film.listOfActors,
          status: 1,
        },
      });
};

export const getFilmByActor = async (req: Request, res: Response) => {
  const {
    body: { actor },
  } = req;

  if (!actor) return res.sendStatus(400);

  const film = await filmService.getOneFilmByActor(actor);

  !film
    ? res.status(404).json({
        status: 0,
        error: {
          fields: 'actor',
          code: 'MOVIE_NOT_FOUND',
        },
      })
    : res.status(200).json({
        data: {
          title: film.title,
          year: film.year,
          format: film.formatOfMovie,
          actors: film.listOfActors,
          status: 1,
        },
      });
};

export const updateFilm = async (req: Request, res: Response) => {
  const { body, params } = req;

  const film = await filmService.getOneFilmById(+params.filmId);

  if (!film)
    return res.json({
      status: 0,
      error: {
        fields: 'id',
        code: 'MOVIE_NOT_FOUND',
      },
    });

  const resp = await filmService.updateMovie(+params.filmId, body);

  res.json({ data: resp, status: 1 });
};

export const getAllFilms = async (req: Request, res: Response) => {
  const {
    query: { offset, limit, order, sort },
  } = req;

  if (!offset || !limit || !order || !sort)
    return res.status(400).json({ message: 'specify offset, limit. sort and order' });

  //@ts-expect-error: order is literal type here
  const films = await filmService.getAllFilmsInAbcOrder(+offset, +limit, order, sort);

  !films
    ? res.sendStatus(404)
    : res.status(200).json(
        films.map((film) => ({
          id: film.id,
          title: film.title,
          year: film.year,
          formatOfMovie: film.formatOfMovie,
          listOfActors: film.listOfActors,
        })),
      );
};

export const deleteFilm = async (req: Request, res: Response) => {
  const { params } = req;

  const film = await filmService.getOneFilmById(+params.filmId);

  if (!film)
    return res.json({
      status: 0,
      error: {
        fields: 'id',
        code: 'MOVIE_NOT_FOUND',
      },
    });

  await filmService.removeFilm(+params.filmId);

  res.json({
    status: 1,
  });
};

export const importFilmData = async (req: Request, res: Response) => {
  const data = await importFile(`${req.file!.path}`);
  res.status(200).json({ data });
};
