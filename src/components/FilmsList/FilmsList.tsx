'use client'

import React, { FC } from "react";

import { usePathname } from 'next/navigation'

import { FilmListElement } from "../FilmListElement/FilmListElement";

import type { IFilmDetails } from "@/services/types/data";

import { genres } from "@/services/consts";

import styles from './FilmsList.module.css'

export const FilmsList: FC<{ films: Array<IFilmDetails | undefined> }> = ({ films }) => {

    const pathname = usePathname();

    const isRenderInCart = pathname === '/cart' ? true : false;


    return (
        <ul className={`${styles.section}`}>
            {films?.length > 0 && films.map((film: any) => {
                return (
                    <FilmListElement key={film.id} id={film.id} title={film.title} genre={(genres as any)[film.genre]} posterUrl={film.posterUrl} isRenderInCart={isRenderInCart} />
                )
            })}
        </ul>
    )
}