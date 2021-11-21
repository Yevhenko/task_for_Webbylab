import express from 'express';
import * as filmController from '../film/controller';

export const film = express.Router();

film.get('/api/v1/movies/:filmId', filmController.getFilmById);
film.get('/api/v1/filmByName/:name', filmController.getFilmByName);
film.delete('/api/v1/movies/:filmId', filmController.deleteFilm);
film.get('/api/v1/movies', filmController.getAllFilms);
film.get('/api/v1/movies/import', filmController.importFilmData);
film.post('/api/v1/movies', filmController.addNewFilm);
film.post('/api/v1/filmByActor', filmController.getFilmByActor);
film.patch('/api/v1/movies/:filmId', filmController.updateFilm);
