'use client'

import React, { FC, useState, useRef } from "react";
import { FilterFormContext } from "../FilterForm/FilterForm";

import { useRouterWithSeacrhParams } from "@/hooks/useRouterWithSeacrhParams";

import styles from './FilterFormSelectInput.module.css'
import { DropElement } from "../DropElement/DropElement";
import { FilterFormSelectInputOptionList } from "../FilterFormSelectInputOptionList/FilterFormSelectInputOptionList";

import type { TFilters, IFilterCategoryOptions } from "@/services/types/data";

import { genres, filterParams } from "@/services/consts";
import { useGetCinimasQuery } from "@/services/biletopoisk-api";



interface IFilterFormSelectInput {
    id: Exclude<TFilters, 'name'>,
    label: string,
    options: Array<IFilterCategoryOptions | undefined>,
    placeholder: string,
}

interface IfilterCategories {
    genre: { [Property in TGenresInApi]: string },
    cinima: { [Property: string]: string },
}


export const FilterFormSelectInput: FC<IFilterFormSelectInput> = ({ id, label, options, placeholder }) => {

    //Управление выпадающим списком - связка через контекст с другими input, чтобы нельзя было одновременно открыть несколько dropdown.
    //Асинхронное выполнение для корректной обработки событий focus и blur, при переключении инпутов и выбора опции в списке dropdown.
    const { openedDrop, toggleDropdown } = React.useContext(FilterFormContext);

    const dropDownClickOrFocusHandler = React.useCallback((evt: React.FocusEvent | React.MouseEvent) => {
        evt.stopPropagation();
        setTimeout(() => {
            !!toggleDropdown && toggleDropdown(id);
        }, 170)
    }, [])

    const dropDownOnBlurHandler = (evt: React.FocusEvent | React.MouseEvent) => {
        evt.stopPropagation();
        setTimeout(() => {
            !!toggleDropdown && toggleDropdown(undefined);
        }, 150)
    }

    const dropDownKeyboardHandler = React.useCallback((evt: KeyboardEvent) => {
        if (openedDrop === id && evt.key === 'Escape') !!toggleDropdown && toggleDropdown(undefined);
        if (openedDrop === id) return;
        if (openedDrop === undefined && relativeElement.current === document.activeElement && evt.key === 'ArrowDown') {
            !!toggleDropdown && toggleDropdown(id);
        }
    }, [openedDrop, id]);


    React.useEffect(() => {
        document.addEventListener('keydown', dropDownKeyboardHandler);
        return () => { document.removeEventListener('keydown', dropDownKeyboardHandler); }
    }, [openedDrop, id])


    //Выбранное значение берется из query параметра адресной строки, а затем резолвится в соответствующее имя опции для подстановки в placeholder
    const { router, pathname, searchParams, createQueryString } = useRouterWithSeacrhParams();

    const getSelectedOptionUIName = (): string => {
        const selectedOption = searchParams.get(id);
        const selectedOptionUiName = options.find(option => option?.optionNameInApi === selectedOption)?.optionNameInUi || '';
        return selectedOptionUiName;
    }

    const selectedOptionName = getSelectedOptionUIName();


    //По вводу в Input запускается фильтр опций

    const [optionsToRender, setOptionsToRender] = React.useState(options);

    const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const inputLetters = evt?.target?.value;
        const inputLength = inputLetters.length;
        const filteredOptions = options.filter(option => {
            const wordsToSeach = option?.optionNameInUi.split(' ');
            return wordsToSeach && wordsToSeach.some(word => word.slice(0, inputLength).toLowerCase() === inputLetters.toLowerCase());
        })
        setOptionsToRender(filteredOptions);
    }


    // ref используется для вычисления координат dropdown
    const relativeElement = useRef<any>();


    return (
        <div>
            <label className={styles.label} htmlFor={label} >{label}<br /></label>
            <input className={styles.input} id={label} ref={relativeElement} type='text' onFocus={dropDownClickOrFocusHandler} onBlur={dropDownOnBlurHandler} onChange={onChange} placeholder={selectedOptionName ? selectedOptionName : placeholder} />
            {openedDrop === id && relativeElement.current && options.length > 0 && <DropElement reff={relativeElement.current}>
                <FilterFormSelectInputOptionList categoryName={id} options={optionsToRender} />
            </DropElement>}
        </div>


    )



}