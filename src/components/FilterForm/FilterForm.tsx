'use client'

import React, { FC } from "react";

import { LayoutContext } from "@/app/layout";

import { FilterFormSelectInput } from "../FilterFormSelectInput/FilterFormSelectInput";
import { FilterFormElement } from "../FilterFormElement/FilterFormElement";

import { useGetCinimasQuery } from "@/services/biletopoisk-api";

import type { TFilters, IFilterCategoryOptions } from '../../services/types/data'
import { filterLabels, genres } from "@/services/consts";
import { isMobile } from "@/utils/utils";

import styles from './FilterForm.module.css'
import { Button } from "../Button/Button";



//Используем контекст для связи SelectInputs, чтобы одновременно можно было открыть только один dropdown
type TDropOpenCategory = Exclude<TFilters, 'name'> | undefined;

export const FilterFormContext = React.createContext<{ openedDrop: TDropOpenCategory, toggleDropdown: Function | undefined }>({
    openedDrop: undefined,
    toggleDropdown: undefined
})



export const FilterForm: FC = () => {

    const { hideSideBar } = React.useContext(LayoutContext)

    const [openedDrop, setActiveDrop] = React.useState<TDropOpenCategory>(undefined);

    const toggleDropdown = React.useCallback((category: TDropOpenCategory): void => {
        setActiveDrop(active => active === category ? undefined : category)
    }, []);


    //Собираем данные для пропсов фильтра genre
    const genreFilterLabel = filterLabels.genre;

    const genreFilterOptions: Array<IFilterCategoryOptions | undefined> = React.useMemo(() => {
        const arr = [{ optionNameInApi: '', optionNameInUi: 'Не выбрано' }];
        for (let key in genres) {
            arr.push({ optionNameInApi: key, optionNameInUi: (genres as any)[key] })
        }
        return arr;
    }, [genres]);


    //Собираем данные для пропсов фильтра cinima
    const cinimaFilterLabel = filterLabels.cinima;

    const { data: cinimas } = useGetCinimasQuery();
    const cinimaFilterOptions: Array<IFilterCategoryOptions | undefined> = React.useMemo(() => {
        const arr = [{ optionNameInApi: '', optionNameInUi: 'Не выбрано' }];
        !!cinimas && cinimas.forEach(cinima => {
            arr.push({ optionNameInApi: cinima.id, optionNameInUi: cinima.name })
        });
        return arr;
    }, [cinimas])


    //Для мобильной версии добавляем кнопку "Показать результаты"
    const [mobile, setMobile] = React.useState(isMobile());
    React.useLayoutEffect(() => {
        setMobile(isMobile());
    })

    //Для мобильной версии submit скрывает сайдбар с формой

    const onSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        isMobile() && !openedDrop && hideSideBar();
    }




    return (
        <form name="filterForm" className={`${styles.section}`} onSubmit={onSubmit}>
            <h2 className={styles.heading}>Фильтр поиска</h2>
            <FilterFormContext.Provider value={{ openedDrop, toggleDropdown }}>
                <FilterFormElement type='text' filterParam='name' placeholder='Введите название' />
                <FilterFormSelectInput id={'genre'} label={genreFilterLabel} options={genreFilterOptions} placeholder={'Выберите жанр'}></FilterFormSelectInput>
                <FilterFormSelectInput id={'cinima'} label={cinimaFilterLabel} options={cinimaFilterOptions} placeholder={'Выберите кинотеатр'}></FilterFormSelectInput>
            </FilterFormContext.Provider>
            {mobile && <Button design={'accept'} type={'submit'} label={'Показать результаты'} extraClass={styles.mobileBtn} />}
        </form>
    )
}