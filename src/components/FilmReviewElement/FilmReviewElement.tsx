'use client'

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux/es/hooks/useSelector";
import { selectItemAmount } from '../../redux/features/cart/selector';

import { getDataFromApi, apiQueryMovies } from "@/services/biletopoisk-api";

import { Counter } from "../Counter/Counter";
import type { IFilmReview } from "@/services/types/data";

import styles from './FilmReviewElement.module.css'

export const FilmReviewElement: FC<IFilmReview> = ({ id, name, rating, text }) => {

    const [currentFilmId, setCurrentFilmId] = useState();
    const router = useRouter();

    const amount = useSelector((state) => selectItemAmount(state, '123'));

    return (
        <li className={styles.section}>
            <img src='https://manaud.net/uploads/posts/2021-12/1640162881_53-almode-ru-p-novogodnii-makiyazh-so-strazami-54.jpg' alt='аватар пользователя'/>
            <div>
                <p>{name}</p>
                <p>Оценка: <span>{rating}</span></p>
            </div>
            <p>{text}</p>

        </li>
    )
}