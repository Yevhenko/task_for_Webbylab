import express from 'express';
import * as filmController from '../film/controller';

export const film = express.Router();

film.post('/film', filmController.addNewFilm);
film.post('/filmByActor', filmController.getFilmByActor);
film.get('/film/:filmId', filmController.getFilmById);
film.get('/filmByName/:name', filmController.getFilmByName);
film.delete('/film/:filmId', filmController.deleteFilm);
film.get('/films', filmController.getAllFilms);
film.get('/film', filmController.importFilmData);
