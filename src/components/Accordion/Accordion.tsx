import React, { FC, useContext } from "react"

import { LayoutCommonBlock } from "../LayoutCommonBlock/LayoutCommonBlock"
import { DropDownButton } from "../DropDownButton/DropDownButton"

import styles from './Accordion.module.css'

interface IAccordionContext {
    activeCategory: string | undefined,
    switchCategory: Function
}


const AccordionContext = React.createContext<IAccordionContext>({ activeCategory: undefined, switchCategory: () => { } })

export const Accordion: FC<{ children: React.ReactElement | React.ReactElement[] }> = ({ children }) => {
    const [activeCategory, setActiveCategory] = React.useState<string | undefined>();

    const switchCategory = React.useCallback((category: string | undefined) => {
        setActiveCategory(active => active === category ? undefined : category)
    }, [])

    return (
        <AccordionContext.Provider value={{ activeCategory, switchCategory }}>
            {children}
        </AccordionContext.Provider>
    )

}


export const CategoryName: FC<{ children: React.ReactElement | React.ReactElement[], heading: string }> = function CategoryName({ children, heading }) {

    const { activeCategory, switchCategory } = useContext(AccordionContext);

    return (
        <LayoutCommonBlock extraClass={styles.categoryNameBlock} onClick={() => switchCategory(heading)}>
            <div className={styles.categoryHeadingContainer} ><h2 className={styles.heading}>{heading}</h2>
            <DropDownButton isDropOpened={activeCategory === heading}/>
            </div>
            {activeCategory === heading && <>{children}</>}
        </LayoutCommonBlock>

    )
};


export const CategoryDescription: FC<{ text: string }> = function CategoryDescription({ text }) {

    return (
        <p className={styles.descriptionBlock}>{text}</p>
    )
};
