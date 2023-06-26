
import React, { FC, useContext } from "react"

import styles from './Accordion.module.css'

const AccordionContext = React.createContext(false)

const Accordion: any = ({ children }) => {
    const [activeCategory, setActiveCategory] = React.useState();

    const switchCategory = React.useCallback((category) => {
        setActiveCategory(active => active === category ? undefined : category)
    }, [])

    return (
        <AccordionContext.Provider value={{ activeCategory, switchCategory }}>
            {children}
        </AccordionContext.Provider>
    )

}

Accordion.CategoryName = function CategoryName({ children, heading }) {

    const { activeCategory, switchCategory } = useContext(AccordionContext);

    return (
        <div>
            <h2 className={styles.heading} onClick={() => switchCategory(heading)}>{heading}</h2>
            {activeCategory === heading && <div>
                {children}
            </div>
            }
        </div>

    )
};


Accordion.CategoryDescription = function CategoryDescription({ children, text }) {

    return (
        <p>{text}</p>
    )
};


export const QnAAccordion = () => {

    return (
        <div>
            <Accordion>
                <Accordion.CategoryName heading='Что такое Билетопоиск?'>
                    <Accordion.CategoryDescription text='Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов.' />
                </Accordion.CategoryName>
                <Accordion.CategoryName heading='Какой компании принадлежит Билетопоиск?'>
                    <Accordion.CategoryDescription text='Компании хороших людей' />
                </Accordion.CategoryName>
                <Accordion.CategoryName heading='Как купить билет на Билетопоиск?'>
                    <Accordion.CategoryDescription text='За деньги' />
                </Accordion.CategoryName>
                <Accordion.CategoryName heading='Как оставить отзыв на Билетопоиск?'>
                    <Accordion.CategoryDescription text='Напишите письмо директору' />
                </Accordion.CategoryName>
            </Accordion>
        </div>
    )
} 
