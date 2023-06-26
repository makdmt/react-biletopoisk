const apiUrl: string = 'http://localhost:3001/api'
export const apiQueryCinimas: string = 'cinemas';
export const apiQueryMovies: string = 'movies';
export const apiQueryReviews: string = 'reviews';
export const apiQueryMoviesInCinima = (cinimaId: 'string'): string => `movies?cinemaId=${cinimaId}`;
export const apiQueryMovieDetails = (movieId: 'string'): string => `movies?movieId=${movieId}`;
export const apiQueryReviewsOfMovie = (movieId: 'string'): string => `reviews?movieId=${movieId}`;
  
  export async function getDataFromApi(apiQueryParam: string): Promise<TResponseBody> {
    return fetch(`${apiUrl}/${apiQueryParam}`)
      .then(res => checkResponse(res))
  }

  const checkResponse = (res: IServerResponse): Promise<TResponseBody> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };

  export interface IServerResponse<T = any> {
    readonly ok: boolean,
    readonly status: number,
    readonly url: string,
    json(): Promise<T>
  }

  export type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
    [Property in TDataKey]: TDataType;
  } & {
    readonly success: boolean;
    readonly message?: string;
  }