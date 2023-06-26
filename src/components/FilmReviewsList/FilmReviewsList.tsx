'use client'

import React, { FC, useState } from "react";

import { FilmReviewElement } from "../FilmReviewElement/FilmReviewElement";
import type { IFilmReview } from "@/services/types/data";

import styles from './FilmReviewsList.module.css'

export const FilmReviewsList: FC<{reviews: Array<IFilmReview>}> = ({reviews}) => {

    console.log('reviewList')


    return (
        <ul>
            {reviews?.length > 0 && reviews.map(({ id, name, rating, text }: IFilmReview) => {
                return (
                    <FilmReviewElement key={id} id={id} name={name} rating={rating} text={text} />
                )
            })}
        </ul>
    )
}