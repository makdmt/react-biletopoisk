'use client'

import { FC } from "react"
import { useGetMovieQuery, useGetMovieReviewsQuery } from "@/services/biletopoisk-api"

import { FilmDetails } from "@/components/FilmDetails/FilmDetails";
import { FilmReviewsList } from "@/components/FilmReviewsList/FilmReviewsList";

export default function FilmDetailsPage({ params }: { params: { id: string } }) {
    const { data: filmDetails, isLoading, isError } = useGetMovieQuery(params.id);
    const { data: filmReviews, isLoading: isLoding } = useGetMovieReviewsQuery(params.id);


    if (isLoading || isLoding) {
        return <span>Loading...</span>

    }

    if (!filmDetails || isError) {
        return <span>Not Found</span>
    }

    return (
        <div>
            <FilmDetails {...filmDetails} />
            <FilmReviewsList reviews={filmReviews} />
        </div>
    )
}