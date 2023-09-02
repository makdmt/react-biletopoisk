'use client'

import React, { FC, useState, useRef } from "react";
import { FilterFormContext } from "../FilterForm/FilterForm";

import { useRouterWithSeacrhParams } from "@/hooks/useRouterWithSeacrhParams";

import styles from './FilterFormElement.module.css'
import { DropElement } from "../DropElement/DropElement";
import { FilterCriteriaList } from "../FilterCriteriaList/FilterCriteriaList";

import type { ICinima, TFilterParams, TGenresInApi } from "@/services/types/data";

import { genres, filterLabels } from "@/services/consts";
import { useGetCinimasQuery } from "@/services/biletopoisk-api";


interface IFilterFormElement {
    type: 'text' | 'select',
    filterParam: TFilterParams,
    placeholder: string,
}

interface IfilterCategories {
    genre: { [Property in TGenresInApi]: string },
    cinima: { [Property: string]: string },
}


export const FilterFormElement: FC<IFilterFormElement> = ({ type, filterParam, placeholder, }) => {

    const { data: cinimas } = useGetCinimasQuery();

    const cinimasToFilter = React.useMemo(() => {
        if (cinimas?.length > 0) {
            return cinimas.reduce((acc: { [Property: string]: string }, cinima: ICinima) => {
                acc[cinima.id] = cinima.name;
                return acc;
            }, {})
        } else {
            return {};
        }
    }, [cinimas])

    const label = filterLabels[filterParam];


    const { dropOpen, setDropOpen } = React.useContext(FilterFormContext);
    const relativeElement = useRef<any>();

    const onClickHandler = () => {
        !!setDropOpen && setDropOpen(filterParam);
    }

    const filterCategories: IfilterCategories = {
        genre: genres,
        cinima: cinimasToFilter
    }

    const filterCategoryList = React.useMemo(() => {
        if (!!dropOpen && filterCategories.hasOwnProperty(dropOpen)) return Object.entries((filterCategories as any)[dropOpen])
    }, [dropOpen])

    const { router, pathname, searchParams, createQueryString } = useRouterWithSeacrhParams();

    const onChange = (e: any) => {

        router.push(pathname + '?' + createQueryString('name', e.target.value));
    };


    if (type === 'text') return (
        <label className={styles.label} >{label} <br />
            <input className={styles.input} type='text' placeholder={placeholder} onChange={onChange} value={searchParams.get('name') || ''} />
        </label>
    )

    if (type === 'select') return (
        <label className={styles.label} ref={relativeElement} onClick={onClickHandler}>{label} <br />
            <input className={styles.input} type='text' disabled placeholder={searchParams.get(filterParam) ? filterCategories[filterParam][searchParams.get(filterParam)] : placeholder} />
            {dropOpen === filterParam && relativeElement.current && filterCategoryList && <DropElement reff={relativeElement.current}>
                <FilterCriteriaList categoryName={filterParam} categoryList={filterCategoryList} />
            </DropElement>}
        </label>
    )



}