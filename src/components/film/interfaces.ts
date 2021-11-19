import { FilmFormat } from '@constants/index';

export interface Actor {
  firstName: string;
  lastName: string;
}

export interface IFilm {
  id?: number;
  title: string;
  year: number;
  formatOfMovie: FilmFormat;
  listOfActors: Array<Actor>;
}
