'use client'

import { useGetMoviesQuery, useGetCinimasQuery, useGetMoviesInCinimaQuery } from "@/services/biletopoisk-api";
import { useSearchParams } from "next/navigation";

import { FilmsList } from "@/components/FilmsList/FilmsList"
import type { IFilmDetails } from "@/services/types/data";
import { FilterForm } from "@/components/FilterForm/FilterForm";

import styles from './page.module.css'

export default function Home() {

  const { data: films, isLoading, isError }: { data: Array<IFilmDetails>, isLoading: boolean, isError: boolean } = useGetMoviesQuery();
  const { data: cinimas } = useGetCinimasQuery();

  const searchParams = useSearchParams();


  // console.log(params.filterParams);
  // console.log(cinimas);

  const cinimaIdforFilter = searchParams.get('cinima') || '';
  const genreforFilter = searchParams.get('genre') || '';
  const nameforFilter = searchParams.get('name') || '';

  const { data: filmsInCinimas } = useGetMoviesInCinimaQuery(cinimaIdforFilter);

  let filmsToRender: Array<IFilmDetails> = filmsInCinimas?.length > 0 ? filmsInCinimas : films;

  // if (cinimaIdforFilter.length > 0) filmsToRender.concat(filmsInCinimas)
  if (!!genreforFilter) filmsToRender = filmsToRender?.filter((film: IFilmDetails) => film.genre === genreforFilter);
  if (!!nameforFilter) filmsToRender = filmsToRender?.filter((film: IFilmDetails) => {
    const namePart = film.title.substring(0, nameforFilter.length);
    console.log(namePart);
    return namePart.toLowerCase() === nameforFilter.toLowerCase();
  });




  if (isLoading) {
    return <span>Loading...</span>

  }

  if (!films || films.length === 0 || isError) {
    return <span>Not Found</span>
  }


  return (
    <section className={styles.section}>
      <FilterForm />
      <FilmsList films={filmsToRender} />
    </section>
  )
}
