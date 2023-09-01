'use client'

import { useGetCinimasQuery, useGetMovieQuery, useGetMoviesInCinimaQuery, useGetMoviesQuery } from "@/services/biletopoisk-api"
import type { IFilmDetails } from "@/services/types/data";

import { FilmDetails } from "@/components/FilmDetails/FilmDetails";
import { FilterForm } from "@/components/FilterForm/FilterForm";

import React from "react";
import { FilmsList } from "@/components/FilmsList/FilmsList";

import { genres } from "@/services/consts";

import styles from './page.module.css'

export default function FilteredFilmsList({ params }: { params: { filterParams: string[] } }) {
    const { data: films, isLoading, isError } = useGetMoviesQuery();
    const { data: cinimas } = useGetCinimasQuery();

    console.log(params.filterParams);
    console.log(cinimas);

    const cinimaIdforFilter = params.filterParams.filter(param => cinimas?.some((c: any) => c.id === param)) || [''];
    const genreforFilter = params.filterParams.filter(param => param in genres);

    const { data: filmsInCinimas } = useGetMoviesInCinimaQuery(cinimaIdforFilter[0]);

    let filmsToRender: Array<IFilmDetails | undefined> = filmsInCinimas?.length > 0 ? filmsInCinimas : films;

    // if (cinimaIdforFilter.length > 0) filmsToRender.concat(filmsInCinimas)
    if (!!genreforFilter.length) filmsToRender = filmsToRender?.filter((film: any) => film.genre === genreforFilter[0]);

    // const filmsToRender = React.useMemo(() => {
    //     if (!!films && films.length > 0) {
    //         return params.filterParams.flatMap((param) => {
    //             return films.filter((film: IFilmDetails) => film.genre === param)
    //         })
    //     } else {
    //         return [];
    //     }
    // }, [films])


    // console.log(params.filterParams)
    // console.log(filmsToRender)

    // const {data: filmDetails, isLoading, isError} = useGetMovieQuery(params.id);

    // console.log(`filmId ${params.id}`)

    if (isLoading) {
        return <span>Loading...</span>

    }

    if (!films || isError) {
        return <span>Not Found</span>
    }

    return (
        <section className={styles.section}>
            <FilterForm />
            {filmsToRender.length > 0 && <FilmsList films={filmsToRender} />}
        </section>
    )
}