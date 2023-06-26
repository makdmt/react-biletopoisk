'use client'

import React, { FC } from "react";
import { FilterFormElement } from "../FilterFormElement/FilterFormElement";

import styles from './FilterForm.module.css'


interface IFilterFormElement {
    type: string,
    label: string,
    disabled?: boolean,
}

export const FilterFormContext = React.createContext(false)

export const FilterForm: FC = () => {

    const [dropOpen, setActiveDrop] = React.useState();

    const setDropOpen = React.useCallback((category: any) => {
        setActiveDrop(active => active === category ? undefined : category)
    }, [])

    return (
        <form className={styles.section}>
            <h2 className={styles.heading}>Фильтр поиска</h2>
            <FilterFormContext.Provider value={{ dropOpen, setDropOpen }}>
                <FilterFormElement type='text' filterParam='name' placeholder='Введите название' />
                <FilterFormElement type='select' filterParam='genre' placeholder='Выберите жанр' />
                <FilterFormElement type='select' filterParam='cinima' placeholder='Выберите кинотеатр' />
            </FilterFormContext.Provider>
        </form>
    )
}