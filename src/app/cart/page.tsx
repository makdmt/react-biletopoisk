'use client'

import { FC } from "react"

import { useGetMoviesQuery } from "@/services/biletopoisk-api";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { selectCartModule } from "@/redux/features/cart/selector";

import { FilmsList } from "@/components/FilmsList/FilmsList";


export default function CartPage() {

    const { data: allFilms, isLoading, isError } = useGetMoviesQuery();

    const cart = useSelector((state) => selectCartModule(state));

    const filmsInCart = [];

    for (const item in cart) {
        filmsInCart.push(item);
    }

    const filmsToRender = (filmsInCart?.length > 0 && allFilms?.length > 0) ? filmsInCart.flatMap(filmId => allFilms.filter(film => film.id === filmId)) : [];


    
    if (isLoading) {
        return <span>Loading...</span>

    }

    if (!filmsToRender || isError) {
        return <span>Not Found</span>
    }

    return (
        <div>
            {filmsToRender.length > 0 && <FilmsList films={filmsToRender} />}
        </div>
    )
}