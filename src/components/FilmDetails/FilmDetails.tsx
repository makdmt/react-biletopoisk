'use client'

import React, { FC } from "react";

import Image from "next/image";

import { LayoutCommonBlock } from "../LayoutCommonBlock/LayoutCommonBlock";
import { Counter } from "../Counter/Counter";
import { Modal } from "../Modal/Modal";

import type { IFilmDetails } from "@/services/types/data";
import { genres } from "@/services/consts";

import styles from './FilmDetails.module.css'


export const FilmDetails: FC<IFilmDetails> = ({ id, title, genre, posterUrl, releaseYear, rating, director, description }) => {

    const [modalOpened, setmodalOpened] = React.useState<boolean>(false);


    const openModal = (evt: React.MouseEvent<HTMLElement>) => {
        evt.stopPropagation();
        setmodalOpened(true);
    }

    const closeModalByClick = React.useCallback((evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.stopPropagation();
        setmodalOpened(false);
    }, []);

    const closeModalByPressEsc = React.useCallback((evt: KeyboardEvent) => {
        evt.stopPropagation();
        evt.key === 'Escape' && setmodalOpened(false);
    }, []);

    const genreToRender: string = (genres as any)[genre];



    return (
        <section>
            <LayoutCommonBlock>
                <div className={styles.filmInfoSection}>
                <div className={styles.imgContainer} onClick={openModal}>
                    <Image src={posterUrl} alt={title} width={400} height={500} loading='lazy' className={styles.image} />
                </div>
                <div className={styles.headingContainer}>
                    <h2 className={styles.heading}>{title}</h2>
                    <Counter filmId={id} />
                </div>
                <ul className={styles.filmDetailsList} >
                    <li>Жанр: <span>{genreToRender}</span></li>
                    <li>Год выпуска: <span>{releaseYear}</span></li>
                    <li>Рейтинг:  <span>{rating}</span></li>
                    <li>Режиссер: <span>{director}</span></li>
                </ul>
                <div className={styles.filmDescriptionBlock}>
                    <h2 className={styles.filmDescriptionBlock__heading}>Описание</h2>
                    <p className={styles.filmDescriptionBlock__text}>{description}</p>
                </div>
                </div>
            </LayoutCommonBlock>
            {modalOpened && <Modal closeByClickFunc={closeModalByClick} closeByEscFunc={closeModalByPressEsc}>
                {/* <Image src={posterUrl} alt={title} width={400} height={500} loading='lazy' className={styles.imageInModal} /> */}
                <img src={posterUrl} alt={title} loading='lazy' className={styles.imageInModal} />
            </Modal>}
        </section>
    )
}