'use client'

import React, { FC } from "react";

import { useRouterWithSeacrhParams } from "@/hooks/useRouterWithSeacrhParams";

import { LayoutContext } from "@/app/layout";

import { FilterFormSelectInput } from "../FilterFormSelectInput/FilterFormSelectInput";

import { useGetCinimasQuery } from "@/services/biletopoisk-api";

import type { TFilters, IFilterCategoryOptions } from '../../services/types/data'
import { filterLabels, genres } from "@/services/consts";
import { isMobile } from "@/utils/utils";

import styles from './FilterForm.module.css'
import { Button } from "../Button/Button";
import { FilterFormTextInput } from "../FilterFormTextInput/FilterFormTextInput";


type TDropOpenCategory = Exclude<TFilters, 'name'> | undefined;

interface IFilterFormContext {
    openedDrop: TDropOpenCategory,
    toggleDropdown: Function | undefined,
    applyFilter: Function
}


//Используем контекст для связи SelectInputs, чтобы одновременно можно было открыть только один dropdown
export const FilterFormContext = React.createContext<IFilterFormContext>({
    openedDrop: undefined,
    toggleDropdown: undefined,
    applyFilter: () => { }
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

    //Значения фильтров применяются путем добавления в query параметры:
    const { router, pathname, createQueryString, searchParams } = useRouterWithSeacrhParams();

    const applyFilter = (filterId: TFilters, value: string) => {
        router.push(pathname + '?' + createQueryString(filterId, value));
    }

    //Фильтр по имени запускается по вводу в input:

    const textInputHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        applyFilter('name', evt.target.value)
    }







    return (
        <form name="filterForm" className={`${styles.section}`} onSubmit={onSubmit}>
            <h2 className={styles.heading}>Фильтр поиска</h2>
            <FilterFormContext.Provider value={{ openedDrop, toggleDropdown, applyFilter }}>
                <FilterFormTextInput id={'name'} label={'Название'} placeholder={searchParams.get('name') || "Введите название"} onChange={textInputHandler} isDebounced={true} />
                <FilterFormSelectInput id={'genre'} label={genreFilterLabel} options={genreFilterOptions} placeholder={'Выберите жанр'}></FilterFormSelectInput>
                <FilterFormSelectInput id={'cinima'} label={cinimaFilterLabel} options={cinimaFilterOptions} placeholder={'Выберите кинотеатр'}></FilterFormSelectInput>
            </FilterFormContext.Provider>
            {mobile && <Button design={'accept'} type={'submit'} label={'Показать результаты'} extraClass={styles.mobileBtn} />}
        </form>
    )
}