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
export interface IFilmReview {
  id: string,
  name: string,
  rating: number,
  text: string,
  avatarSrc?: string
}


export type TFilters = 'name' | 'genre' | 'cinima';
export type TFilterLabelsInUI = 'Название' | 'Жанр' | 'Кинотеатр';
export type TFilterGenresInApi = 'fantasy' | 'horror' | 'action' | 'comedy';
export type TFilterGenresInUI = 'Фэнтези' | 'Ужасы' | 'Боевик' | 'Комедия';

export interface IFilterCategoryOptions {
  optionNameInApi: string,
  optionNameInUi: string
}
