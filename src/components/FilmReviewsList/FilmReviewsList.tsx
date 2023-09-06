'use client'

import React, { FC, useState } from "react";

import { ImgIcon } from "../Icons/ImgIcon";
import type { IFilmReview } from "@/services/types/data";

import styles from './FilmReviewsList.module.css'
import { LayoutCommonBlock } from "../LayoutCommonBlock/LayoutCommonBlock";


export const FilmReviewsList: FC<{ reviews: Array<IFilmReview> }> = ({ reviews }) => {

    return (
        <ul className={styles.section}>
            {reviews?.length > 0 && reviews.map(({ id, name, rating, text, avatarSrc }: IFilmReview) => {
                return (
                    <li key={id}>
                        <LayoutCommonBlock extraClass={styles.reviewContainer} >
                            <div className={styles.avatarContainer}>
                                {!!avatarSrc ? <img src='' alt='аватар пользователя' /> : <ImgIcon />}
                            </div>
                            <div className={styles.userNameContainer}>
                                <h3>{name}</h3>
                                <h3><span>Оценка:</span> {rating}</h3>
                            </div>
                            <p>{text}</p>
                        </LayoutCommonBlock>
                    </li>
                )
            })}
        </ul>
    )
}