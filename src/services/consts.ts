import type { TFilters, TFilterLabelsInUI, TFilterGenresInApi, TFilterGenresInUI, } from "./types/data";

export const genres: { [Property in TFilterGenresInApi]: TFilterGenresInUI } = {
    fantasy: 'Фэнтези',
    horror: 'Ужасы',
    action: 'Боевик',
    comedy: 'Комедия'
}

export const filterLabels: { [Property in TFilters]: TFilterLabelsInUI } = {
    name: 'Название',
    genre: 'Жанр',
    cinima: 'Кинотеатр'
}