import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { IFilmDetails, ICinima, IFilmReview } from "./types/data";


export const biletopoiskApi = createApi({
  reducerPath: 'biletopoiskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/' }),
    endpoints: (builder) => ({
      getMovies: builder.query<IFilmDetails[], void>({ query: () => 'movies'}),
      getMovie: builder.query<IFilmDetails, void>({ query: (movieId) => `movie?movieId=${movieId}`}),
      getCinimas: builder.query<ICinima[], void>({ query: () => 'cinemas'}),
      getMoviesInCinima: builder.query<IFilmDetails[], void>({ query: (cinimaId) => `movies?cinemaId=${cinimaId}`}),
      getReviews: builder.query<IFilmReview[], void>({ query: () => 'reviews'}),
      getMovieReviews: builder.query<IFilmReview[], void>({ query: (movieId) => `reviews?movieId=${movieId}`}),
    }) 
})

export const { useGetMoviesQuery, useGetMovieQuery, useGetCinimasQuery, useGetMoviesInCinimaQuery, useGetMovieReviewsQuery} = biletopoiskApi;
