'use client'

import { useGetMoviesQuery, useGetCinimasQuery, useGetMoviesInCinimaQuery } from "@/services/biletopoisk-api";
import { useSearchParams } from "next/navigation";

import { FilmsList } from "@/components/FilmsList/FilmsList"
import { SideBar } from "@/components/SideBar/SideBar";
import { FilterForm } from "@/components/FilterForm/FilterForm";

import styles from './page.module.css'
import { Loader } from "@/components/Loader/Loader";
import { NoticeMsg } from "@/components/NoticeMsg/NoticeMsg";


export default function Home() {

  const { data: films, isLoading, isError } = useGetMoviesQuery();
  const { data: cinimas, isLoading: isCinimasLoading, isError: isCinimasError } = useGetCinimasQuery();


  //Рендерим фильмы исходя из query параметров фильтров
  const searchParams = useSearchParams();
  const cinimaIdforFilter = searchParams.get('cinima') || '';
  const genreValue = searchParams.get('genre') || '';
  const nameValue = searchParams.get('name') || '';

  const { data: filmsInCinimas, isFetching: isFilmsInCinimasLoading, isError: isFilmsInCinimasError } = useGetMoviesInCinimaQuery(cinimaIdforFilter);

  let filmsToRender = filmsInCinimas || films;

  if (!!genreValue) filmsToRender = filmsToRender?.filter((film) => film.genre === genreValue);
  if (!!nameValue) filmsToRender = filmsToRender?.filter((film) => {
    const wordsInFilmTitle = film.title.split(' ');
    return wordsInFilmTitle.some(word => word.substring(0, nameValue.length).toLowerCase() === nameValue.toLowerCase())
  });


  if (isLoading || isCinimasLoading) {
    return <Loader />
  }

  if (!films || isError || isCinimasError) {
    return <NoticeMsg warningMsg="Произошла ошибка" advice="Попробуйте перезагрузить страницу..." />
  }


  if (filmsToRender) return (
    <div className={styles.section}>
      <SideBar>
        <FilterForm />
      </SideBar>
      <div className={styles.mainContainBlock}>
        {filmsToRender.length === 0 && <NoticeMsg warningMsg="Совпадения не найдены" advice="Попробуйте изменить параметры фильтров" />}
        {isFilmsInCinimasLoading ? <Loader /> : <FilmsList films={filmsToRender} />}
      </div>
    </div>
  )
}
