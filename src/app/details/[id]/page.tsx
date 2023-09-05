'use client'

import { useGetMovieQuery, useGetMovieReviewsQuery } from "@/services/biletopoisk-api"

import { Loader } from "@/components/Loader/Loader";
import { FilmDetails } from "@/components/FilmDetails/FilmDetails";
import { FilmReviewsList } from "@/components/FilmReviewsList/FilmReviewsList";

export default function FilmDetailsPage({ params }: { params: { id: string } }) {
    const { data: filmDetails, isLoading, isError } = useGetMovieQuery(params.id);
    const { data: filmReviews, isLoading: isReviewsLoding } = useGetMovieReviewsQuery(params.id);


    if (isLoading || isReviewsLoding) {
        return <Loader />
    }


    if (!filmDetails || isError) {
        return <span>Not Found</span>
    }
    

    if (filmReviews) return (
        <div>
            <FilmDetails {...filmDetails} />
            <FilmReviewsList reviews={filmReviews} />
        </div>
    )
}