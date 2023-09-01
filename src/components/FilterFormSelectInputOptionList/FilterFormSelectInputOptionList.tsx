'use client'

import React, { FC } from "react";
import { useRouterWithSeacrhParams } from "@/hooks/useRouterWithSeacrhParams";

import type { TFilters, IFilterCategoryOptions } from "@/services/types/data";

import styles from './FilterFormSelectInputOptionList.module.css'


interface IFilterFormSelectInputOptionList {
    categoryName: Exclude<TFilters, 'name'>,
    options: Array<IFilterCategoryOptions | undefined>,
    setSelectedOption?: Function
}


export const FilterFormSelectInputOptionList: FC<IFilterFormSelectInputOptionList> = ({ categoryName, options, setSelectedOption }) => {

    const { router, pathname, createQueryString, searchParams } = useRouterWithSeacrhParams();

    const onSelect = (optionNameInApi: string, optionNameInUi?: string) => {
        router.push(pathname + '?' + createQueryString(categoryName, optionNameInApi));
    }


    return (
        <ul>
            {options.length > 0 && options.map((option) => {
                return (
                    <li key={option?.optionNameInApi} className={styles.section}>
                        {!!option && <a onClick={() => onSelect(option.optionNameInApi, option.optionNameInUi)}>{option.optionNameInUi}</a>}
                    </li>
                )
            })}
        </ul>
    )
}