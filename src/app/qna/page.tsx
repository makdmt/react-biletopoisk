'use client'

import { Accordion, CategoryName, CategoryDescription } from "@/components/Accordion/Accordion";

import styles from './page.module.css'
import { LayoutCommonBlock } from "@/components/LayoutCommonBlock/LayoutCommonBlock";


export default function QnAPage({ params }: { params: { id: string } }) {


    return (
        <div className={styles.section}>
            <LayoutCommonBlock extraClass={styles.headingContainer}>
                <h2>Вопросы-ответы</h2>
            </LayoutCommonBlock>
            <Accordion>
                <CategoryName heading='Что такое Билетопоиск?'>
                    <CategoryDescription text='Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов.' />
                </CategoryName>
                <CategoryName heading='Какой компании принадлежит Билетопоиск?'>
                    <CategoryDescription text='Сайт был создан 7 ноября 2003 года, его основатели — Виталий Таций и Дмитрий Суханов. Владельцем проекта являлась компания ООО «Билетопоиск», которой принадлежало 60 % акций проекта, 40 % акций принадлежало её совладельцу — французской компании ООО AlloCiné. 15 октября 2013 года сервис купила компания «Яндекс».' />
                </CategoryName>
                <CategoryName heading='Как купить билет на Билетопоиск?'>
                    <CategoryDescription text='За деньги.' />
                </CategoryName>
                <CategoryName heading='Как оставить отзыв на Билетопоиск?'>
                    <CategoryDescription text='Напишите письмо директору.' />
                </CategoryName>
            </Accordion>
        </div>
    )
}