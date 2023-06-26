'use client'

import React, { FC } from "react";
import { getDataFromApi, apiQueryMovies } from "@/services/biletopoisk-api";
import { useGetMoviesQuery } from "@/services/biletopoisk-api";

import { usePathname } from 'next/navigation'

import { useDispatch } from "react-redux/es/exports";
import { cartActions } from "@/redux/features/cart";

import { FilmListElement } from "../FilmListElement/FilmListElement";
import type { IFilmDetails } from "@/services/types/data";

export const FilmsList: FC<{ films: Array<IFilmDetails | undefined> }> = ({ films }) => {

    const dispatch = useDispatch();
    const pathname = usePathname();

    const isRenderInCart = pathname === '/cart' ? true : false;

    const genres: { [Property: string]: string } = {
        fantasy: 'фэнтези',
        horror: 'ужасы',
        action: 'экшны',
        comedy: 'комедии'
    }


    return (
        <ul>
            {films?.length > 0 && films.map((film: any) => {
                return (
                    <FilmListElement key={film.id} id={film.id} title={film.title} genre={genres[film.genre]} posterUrl={film.posterUrl} isRenderInCart={isRenderInCart} />
                )
            })}
        </ul>
    )
}