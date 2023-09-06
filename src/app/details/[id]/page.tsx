'use client'

import { useGetMovieQuery, useGetMovieReviewsQuery } from "@/services/biletopoisk-api"

import { Loader } from "@/components/Loader/Loader";
import { FilmDetails } from "@/components/FilmDetails/FilmDetails";
import { FilmReviewsList } from "@/components/FilmReviewsList/FilmReviewsList";
import { NoticeMsg } from "@/components/NoticeMsg/NoticeMsg";

import styles from './page.module.css'

export default function FilmDetailsPage({ params }: { params: { id: string } }) {
    const { data: filmDetails, isLoading, isError } = useGetMovieQuery(params.id);
    const { data: filmReviews, isLoading: isReviewsLoding } = useGetMovieReviewsQuery(params.id);


    if (isLoading || isReviewsLoding) {
        return <Loader />
    }


    if (!filmDetails || isError) {
        <NoticeMsg warningMsg="Произошла ошибка" advice="Попробуйте перезагрузить страницу..." />
    }


    if (filmDetails && filmReviews) return (
        <div className={styles.page}>
            <FilmDetails {...filmDetails} />
            <FilmReviewsList reviews={filmReviews} />
        </div>
    )
}