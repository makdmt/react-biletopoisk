'use client'

import React, { FC } from "react";

import { LayoutContext } from "@/app/layout";

import { useRouter } from 'next/navigation'
import Link from "next/link";

import { TotalCount } from "../TotalCount/TotalCount";
import { FilterIcon } from "../Icons/FilterIcon";
import { ArrowLeftIcon } from "../Icons/ArrowLeftIcon";

import { isMobile } from '../../utils/utils'

import styles from './Header.module.css'



export const Header: FC = () => {

    const router = useRouter();

    const [mobile, setMobile] = React.useState(isMobile());
    React.useLayoutEffect(() => {
        setMobile(isMobile());
    })

    const { isPageWithSideBar, toggleSideBar, isSideBarStateVisible } = React.useContext(LayoutContext);


    return (
        <header className={styles.section}>
            {mobile && isPageWithSideBar && <button title='фильтры' onClick={() => toggleSideBar()} className={`${styles.leftButton} ${isSideBarStateVisible ? styles.leftButton_active : ''}`}><FilterIcon /></button>}
            {mobile && !isPageWithSideBar && <button title='назад' onClick={() => { router.back() }} className={styles.leftButton}><ArrowLeftIcon /></button>}
            <Link href="/" className={styles.heading}>Билетопоиск</Link>
            <TotalCount />
        </header>
    )
}