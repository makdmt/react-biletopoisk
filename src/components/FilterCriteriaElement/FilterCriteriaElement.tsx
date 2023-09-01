'use client'

import React, { FC, useState } from "react";

import { useRouterWithSeacrhParams } from "@/hooks/useRouterWithSeacrhParams";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux/es/hooks/useSelector";
import { selectItemAmount } from '../../redux/features/cart/selector';

import Link from "next/link";

import { getDataFromApi, apiQueryMovies } from "@/services/biletopoisk-api";
import type { IFilmDetails, TFilterParams } from "@/services/types/data";

import styles from './FilterCriteriaElement.module.css'

export const FilterCriteriaElement: FC<{ category: TFilterParams, criteriaInApi: string, criteriaInDisplay: string }> = ({ category, criteriaInApi, criteriaInDisplay }) => {

    const [currentFilmId, setCurrentFilmId] = useState();

    const {router, pathname, createQueryString} = useRouterWithSeacrhParams();


    return (
        <li className={styles.section}>
            <span onClick={() => {router.push(pathname+ '?' + createQueryString(category, criteriaInApi))}}>{criteriaInDisplay}</span>
        </li>
    )
}