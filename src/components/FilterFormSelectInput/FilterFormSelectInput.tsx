'use client'

import React, { FC, useState, useRef } from "react";
import { FilterFormContext } from "../FilterForm/FilterForm";

import { useSearchParams } from "next/navigation";

import { FilterFormTextInput } from "../FilterFormTextInput/FilterFormTextInput";
import { DropDownIcon } from "../Icons/DropDownIcon";
import { DropElement } from "../DropElement/DropElement";
import { FilterFormSelectInputOptionList } from "../FilterFormSelectInputOptionList/FilterFormSelectInputOptionList";

import type { TFilters, IFilterCategoryOptions } from "@/services/types/data";

import styles from './FilterFormSelectInput.module.css'


interface IFilterFormSelectInput {
    id: Exclude<TFilters, 'name'>,
    label: string,
    options: Array<IFilterCategoryOptions | undefined>,
    placeholder: string,
    onSelect: (filterId: TFilters, optionValue: string) => void,
    extraClass?: string
}


export const FilterFormSelectInput: FC<IFilterFormSelectInput> = ({ id, label, options, placeholder, onSelect, extraClass }) => {

    //Управление выпадающим списком - связка через контекст с другими input, чтобы нельзя было одновременно открыть несколько dropdown.
    //Асинхронное выполнение для корректной обработки событий focus и blur, при переключении инпутов и выбора опции в списке dropdown.
    const { openedDrop, setActiveDrop, toggleDropdown } = React.useContext(FilterFormContext);

    const dropDownOnFocusHandler = React.useCallback((evt: React.FocusEvent | React.MouseEvent) => {
        evt.stopPropagation();
        setTimeout(() => {
            !!setActiveDrop && setActiveDrop(id);
        }, 170)
    }, [])

    const dropDownOnBlurHandler = (evt: React.FocusEvent | React.MouseEvent) => {
        evt.stopPropagation();
        setTimeout(() => {
            !!setActiveDrop && setActiveDrop(undefined);
        }, 150)
    }

    const dropDownToggleBtnHandler = React.useCallback((evt: React.MouseEvent) => {
        evt.stopPropagation();
        !!toggleDropdown && toggleDropdown(id);
    }, [openedDrop])


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
    }, [openedDrop, id]);




    const selectOption = (option: IFilterCategoryOptions) => {
        onSelect(id, option.optionNameInApi);
        toggleDropdown && toggleDropdown(undefined);
    }

    //Выбранное значение берется из query параметра адресной строки, а затем резолвится в соответствующее имя опции для подстановки в placeholder
    const searchParams = useSearchParams();

    const getSelectedOptionUIName = (): string => {
        const selectedOption = searchParams.get(id);
        const selectedOptionUiName = options.find(option => option?.optionNameInApi === selectedOption)?.optionNameInUi || '';
        return selectedOptionUiName;
    }

    const selectedOptionName = getSelectedOptionUIName();


    //По вводу в textInput запускается фильтр опций
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


    // в ref передается textInput и используется для вычисления размера dropdown
    const relativeElement = useRef<HTMLInputElement>(null);
    const { width, height } = relativeElement.current?.getBoundingClientRect() || { top: 0, left: 0, width: 0, height: 0 }



    return (
        <div className={`${styles.section} ${extraClass}`}>
            <FilterFormTextInput id={label} label={label} ref={relativeElement} placeholder={selectedOptionName ? selectedOptionName : placeholder} onFocus={dropDownOnFocusHandler} onBlur={dropDownOnBlurHandler} onChange={onChange} debounceDelay={0} />
            <button type='button' title={openedDrop === id ? 'скрыть опции' : 'показать опции'} className={`${styles.toggleBtn} ${openedDrop === id ? styles.toggleBtn_state_opened : ''}`} onClick={dropDownToggleBtnHandler}><DropDownIcon /></button>
            {openedDrop === id && relativeElement.current && options.length > 0 && <DropElement top={height + 25} left={0} width={width}>
                <FilterFormSelectInputOptionList categoryName={id} options={optionsToRender} setSelectedOption={selectOption} />
            </DropElement>}
        </div>
    )
}