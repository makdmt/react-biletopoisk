import type { TGenresInApi, TFilterParams } from "./types/data";

export const genres: { [Property in TGenresInApi]: string } = {
    fantasy: 'фэнтези',
    horror: 'ужасы',
    action: 'боевик',
    comedy: 'комедия'
}

export const filterParams: { [Property in TFilterParams]: string } = {
    name: 'Название',
    genre: 'Жанр',
    cinima: 'Кинотеатр'
}