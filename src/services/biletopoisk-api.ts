import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const apiUrl: string = 'http://localhost:3001/api'
export const apiQueryCinimas: string = 'cinemas';
export const apiQueryMovies: string = 'movies';
export const apiQueryReviews: string = 'reviews';
export const apiQueryMoviesInCinima = (cinimaId: 'string'): string => `movies?cinemaId=${cinimaId}`;
export const apiQueryMovieDetails = (movieId: 'string'): string => `movies?movieId=${movieId}`;
export const apiQueryReviewsOfMovie = (movieId: 'string'): string => `reviews?movieId=${movieId}`;


export const biletopoiskApi = createApi({
  reducerPath: 'biletopoiskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/' }),
    endpoints: (builder) => ({
      getMovies: builder.query({ query: () => 'movies'}),
      getMovie: builder.query({ query: (movieId) => `movie?movieId=${movieId}`}),
      getCinimas: builder.query({ query: () => 'cinemas'}),
      getMoviesInCinima: builder.query({ query: (cinimaId) => `movies?cinemaId=${cinimaId}`}),
      getReviews: builder.query({ query: () => 'reviews'}),
      getMovieReviews: builder.query({ query: (movieId) => `reviews?movieId=${movieId}`}),
    }) 
})

export const { useGetMoviesQuery, useGetMovieQuery, useGetCinimasQuery, useGetMoviesInCinimaQuery, useGetMovieReviewsQuery} = biletopoiskApi;

  


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