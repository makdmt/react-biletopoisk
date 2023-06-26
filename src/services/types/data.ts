export interface IFilmDetails {
  readonly id: string,
  readonly title: string,
  readonly releaseYear: number,
  readonly director: string,
  readonly description: string,
  readonly rating: number,
  readonly genre: string,
  readonly reviewIds: Array<string>,
  readonly posterUrl: string,
}

export interface ICinima {
  id: string,
  name: string,
  movieIds: Array<string>
}

export type TGenresInApi = 'fantasy' | 'horror' | 'action' | 'comedy';
export type TFilterParams = 'name' | 'genre' | 'cinima';

export interface IFilmReview {
  id: string,
  name: string,
  rating: number,
  text: string
}
