'use client'

import React, { FC } from "react";

import { Counter } from "../Counter/Counter";
import type { IImovieDetails } from "@/services/types/data";

import styles from './FilmDetails.module.css'

export const FilmDetails: FC<IImovieDetails> = ({ id, title, genre, posterUrl, releaseYear, rating, director, description }) => {

    return (
        <div>
            <section className={styles.filmInfoSection}>
                <img className={styles.image} src={posterUrl} alt={title} />
                <div className={styles.flexLine}>
                    <h2 className={styles.heading}>{title}</h2>
                    <Counter filmId={id} />
                </div>
                <ul>
                <li className=''>Жанр: <span>{genre}</span></li>
                <li className="">Год выпуска: <span>{releaseYear}</span></li>
                <li className="">Рейтинг:  <span></span>{rating}</li>
                <li className="">Режиссер: <span></span>{director}</li>
                </ul>
                <div className={styles.descriptionContainer}>
                    <p className="">Описание</p>
                    <p className="">{description}</p>
                </div>
            </section>
            <section>
                <h2>Отзывы</h2>
            </section>
        </div>
    )
}