'use client'

import React, { FC } from "react";
import { useRouterWithSeacrhParams } from "@/hooks/useRouterWithSeacrhParams";

import { FilterFormContext } from "../FilterForm/FilterForm";

import type { TFilters, IFilterCategoryOptions } from "@/services/types/data";

import styles from './FilterFormSelectInputOptionList.module.css'
import { wait } from "@/utils/utils";


interface IFilterFormSelectInputOptionList {
    categoryName: Exclude<TFilters, 'name'>,
    options: Array<IFilterCategoryOptions | undefined>,
    setSelectedOption?: Function
}


export const FilterFormSelectInputOptionList: FC<IFilterFormSelectInputOptionList> = ({ categoryName, options, setSelectedOption }) => {

    const { router, pathname, createQueryString, searchParams } = useRouterWithSeacrhParams();

    const { openedDrop, toggleDropdown } = React.useContext(FilterFormContext);

    const [indexOfHightlightedOption, setIndexOfHightlightedOption] = React.useState(-1);

    const listOptionElemetsRef = React.useRef<Array<HTMLElement | null | undefined>>([]);
    const listOptionElemets = listOptionElemetsRef.current;


    //логика выбора опции с клавиатуры
    const optionsIterator = (callBack: Function) => {
        let i = -1;
        return function (evt: KeyboardEvent) {
            if (evt.key === 'ArrowDown') {
                if (i >= -1 && i <= options.length) {
                    i = i === options.length - 1 ? 0 : i + 1;
                    options[i] && callBack(i);
                }
            } else if (evt.key === 'ArrowUp') {
                if (i >= -1 && i <= options.length) {
                    i = i === 0 ? options.length - 1 : i - 1;
                    options[i] && callBack(i);
                }
            }
        }
    }


    // Хотел подставить эту функцию в коллбек итератора, но не работает...пробовал добавить асинкавейты, но все равно не сработало. Почему?
    const hightLightOption = React.useCallback((index: number) => {
        setIndexOfHightlightedOption(index);
        // дождаться ререндера и проскроллить до выделенной опции
    }, []);
    // const optionsIteratorHandler = React.useMemo(() => optionsIterator(hightLightOption), [options, indexOfHightlightedOption])


    const optionsIteratorHandler = React.useMemo(() => optionsIterator(setIndexOfHightlightedOption), [options])

    const optionSelectorKeyboardHandler = React.useCallback((evt: KeyboardEvent) => {
        if (evt.key === 'Enter') {
            const option = options[indexOfHightlightedOption];
            option && onSelect(option.optionNameInApi);
        }
    }, [options, indexOfHightlightedOption])


    React.useEffect(() => {
        document.addEventListener('keydown', optionsIteratorHandler);
        return () => { document.removeEventListener('keydown', optionsIteratorHandler); }
    }, [options, indexOfHightlightedOption])


    React.useEffect(() => {
        document.addEventListener('keydown', optionSelectorKeyboardHandler);
        return () => { document.removeEventListener('keydown', optionSelectorKeyboardHandler); }
    }, [options, indexOfHightlightedOption])


    const onSelect = (optionNameInApi: string, optionNameInUi?: string) => {
        router.push(pathname + '?' + createQueryString(categoryName, optionNameInApi));
        toggleDropdown && toggleDropdown(undefined);
        console.log(listOptionElemets);
        // listOptionElemets.current && console.log(listOptionElemets.current[3]);
    }

    //проскроллить dropDown до выделенной опции    
    React.useEffect(() => {
        const optionElement = listOptionElemets[indexOfHightlightedOption];
        optionElement && optionElement.scrollIntoView(false)
    }, [listOptionElemets, indexOfHightlightedOption])



    return (
        <ul>
            {options.length > 0 && options.map((option, index) => {
                return (
                    <li key={option?.optionNameInApi} ref={(el) => { listOptionElemets[index] = el }} onClick={() => onSelect(option.optionNameInApi, option.optionNameInUi)} className={`${styles.listElement} ${index === indexOfHightlightedOption ? styles.listElement_highlighted : ''}`}>
                        {!!option && <button type='button'>{option.optionNameInUi}</button>}
                    </li>
                )
            })}
        </ul>
    )
}