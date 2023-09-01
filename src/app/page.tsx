'use client'

import { useGetMoviesQuery, useGetCinimasQuery, useGetMoviesInCinimaQuery } from "@/services/biletopoisk-api";
import { useSearchParams } from "next/navigation";

import { FilmsList } from "@/components/FilmsList/FilmsList"
import type { IFilmDetails } from "@/services/types/data";
import { FilterForm } from "@/components/FilterForm/FilterForm";

import styles from './page.module.css'
import { SideBar } from "@/components/SideBar/SideBar";
import { LayoutCommonBlock } from "@/components/LayoutCommonBlock/LayoutCommonBlock";

export default function Home() {

  const { data: films, isLoading, isError } = useGetMoviesQuery();

  const searchParams = useSearchParams();


  const cinimaIdforFilter = searchParams.get('cinima') || '';
  const genreforFilter = searchParams.get('genre') || '';
  const nameforFilter = searchParams.get('name') || '';

  const { data: filmsInCinimas } = useGetMoviesInCinimaQuery(cinimaIdforFilter);

  let filmsToRender: Array<IFilmDetails> = filmsInCinimas?.length > 0 ? filmsInCinimas : films;

  if (!!genreforFilter) filmsToRender = filmsToRender?.filter((film: IFilmDetails) => film.genre === genreforFilter);
  if (!!nameforFilter) filmsToRender = filmsToRender?.filter((film: IFilmDetails) => {
    const namePart = film.title.substring(0, nameforFilter.length);
    console.log(namePart);
    return namePart.toLowerCase() === nameforFilter.toLowerCase();
  });




  if (isLoading) {
    return <main className={styles.section}>Loading...</main>

  }

  if (!films || films.length === 0 || isError) {
    return <main className={styles.section}>Произошла ошибка. Попробуйте перезагрузить страницу...</main>
  }


  return (
    <main className={styles.section}>
      <SideBar>
        <LayoutCommonBlock >
          <FilterForm />
        </LayoutCommonBlock>
      </SideBar>
      <FilmsList films={filmsToRender} />
    </main>
  )
}
