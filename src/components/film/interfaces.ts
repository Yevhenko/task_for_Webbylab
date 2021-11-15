import { FilmFormat } from '@constants/index';

export interface Actor {
  firstName: string;
  lastName: string;
}

export interface IFilm {
  name: string;
  productionYear: Date;
  formatOfMovie: FilmFormat;
  listOfActors: Array<Actor>;
}
