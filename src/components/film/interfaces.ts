import { Column } from 'typeorm';
import { FilmFormat } from '@constants/index';

export interface Actor {
  firstName: string;
  lastName: string;
}

export interface IFilm {
  name: string;
  formatOfMovie: FilmFormat;
  listOfActors: Actor[];
}
