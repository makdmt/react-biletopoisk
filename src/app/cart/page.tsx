'use client'

import { useGetMoviesQuery } from "@/services/biletopoisk-api";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { selectCartModule } from "@/redux/features/cart/selector";

import { FilmsList } from "@/components/FilmsList/FilmsList";
import { LayoutCommonBlock } from "@/components/LayoutCommonBlock/LayoutCommonBlock";

import styles from './page.module.css'
import { Loader } from "@/components/Loader/Loader";
import { NoticeMsg } from "@/components/NoticeMsg/NoticeMsg";


export default function CartPage() {

    const { data: allFilms, isLoading, isError } = useGetMoviesQuery();

    const cart = useSelector((state) => selectCartModule(state));

    const filmsInCart: Array<string> = [];
    let ttlPrice: number = 0;

    for (const item in cart) {
        filmsInCart.push(item);
        ttlPrice = ttlPrice + cart[item];
    }

    const filmsToRender = (filmsInCart?.length > 0 && allFilms && allFilms?.length > 0) ? filmsInCart.flatMap(filmId => allFilms.filter(film => film.id === filmId)) : [];


    if (isLoading) {
        return <Loader />
    }

    if (!filmsToRender || isError) {
        return <NoticeMsg warningMsg="Произошла ошибка" advice="Попробуйте перезагрузить страницу..." />
    }

    return (
        <div className={styles.section}>
            {filmsToRender.length === 0 && <NoticeMsg warningMsg="Корзина пуста"></NoticeMsg>}
            {filmsToRender.length > 0 && <FilmsList films={filmsToRender} />}
            <LayoutCommonBlock extraClass={styles.ttlContainer}>
                <h2 className={styles.priceInfo}>Итого билетов:</h2>
                <p className={styles.priceInfo}>{ttlPrice}</p>
            </LayoutCommonBlock>
        </div>
    )
}