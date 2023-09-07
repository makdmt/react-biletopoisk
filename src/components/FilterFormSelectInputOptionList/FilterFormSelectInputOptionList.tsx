'use client'

import React, { FC } from "react";

import { FilterFormContext } from "../FilterForm/FilterForm";

import type { TFilters, IFilterCategoryOptions } from "@/services/types/data";

import styles from './FilterFormSelectInputOptionList.module.css'


interface IFilterFormSelectInputOptionList {
    categoryName: Exclude<TFilters, 'name'>,
    options: Array<IFilterCategoryOptions | undefined>,
    setSelectedOption: Function,
    inputRef: HTMLInputElement
}


export const FilterFormSelectInputOptionList: FC<IFilterFormSelectInputOptionList> = ({ options, setSelectedOption, inputRef }) => {

    const { openedDrop, toggleDropdown } = React.useContext(FilterFormContext);

    const [indexOfHightlightedOption, setIndexOfHightlightedOption] = React.useState(-1);

    const listOptionElemetsRef = React.useRef<Array<HTMLElement | null | undefined>>([]);
    const listOptionElemets = listOptionElemetsRef.current;


    //логика навигации по списку опций с клавиатуры
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

    const optionsIteratorHandler = React.useMemo(() => optionsIterator(setIndexOfHightlightedOption), [options])

    React.useEffect(() => {
        document.addEventListener('keydown', optionsIteratorHandler);
        return () => { document.removeEventListener('keydown', optionsIteratorHandler); }
    }, [options]);


    //Когда открыт dropDown предотвращаем скролл страницы по нажатию на клавиатуре кнопок вверх-вниз, чтобы страница не прыгала при итерации по опциям списка:
    const preventScrollByKeyboard = React.useCallback((evt: KeyboardEvent) => {
        if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp')
            evt.preventDefault();
    }, [])

    React.useEffect(() => {
        if (openedDrop) {
            window.addEventListener('keydown', preventScrollByKeyboard);
        } else {
            window.removeEventListener('keydown', preventScrollByKeyboard);
        }
        return () => window.removeEventListener('keydown', preventScrollByKeyboard);
    }, [openedDrop]);


    //сам dropDown, при перемещении по списку, скроллим до выделенной опции:    
    React.useEffect(() => {
        const optionElement = listOptionElemets[indexOfHightlightedOption];
        optionElement && optionElement.scrollIntoView(false)
    }, [listOptionElemets, indexOfHightlightedOption])




    //Обработчик выбора опции по нажатию на Enter
    const optionSelectorKeyboardHandler = React.useCallback((evt: KeyboardEvent) => {
        if (evt.key === 'Enter') {
            const option = options[indexOfHightlightedOption];
            option && setSelectedOption(option);
            inputRef.value = '';
        }
    }, [options, indexOfHightlightedOption])


    React.useEffect(() => {
        document.addEventListener('keydown', optionSelectorKeyboardHandler);
        return () => { document.removeEventListener('keydown', optionSelectorKeyboardHandler); }
    }, [options, indexOfHightlightedOption]);



    return (
        <ul>
            {options.length > 0 && options.map((option, index) => {
                return (
                    <li key={option?.optionNameInApi} ref={(el) => { listOptionElemets[index] = el }} onClick={() => setSelectedOption(option)} className={`${styles.listElement} ${index === indexOfHightlightedOption ? styles.listElement_highlighted : ''}`}>
                        {!!option && <button type='button'>{option.optionNameInUi}</button>}
                    </li>
                )
            })}
        </ul>
    )
}