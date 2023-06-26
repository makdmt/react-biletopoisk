'use client'

import React, { FC } from "react";
import { usePathname } from 'next/navigation'
import Link from "next/link";

import { TotalCount } from "../TotalCount/TotalCount";

import styles from './Header.module.css'

export const Header: FC = () => {

    const pathname = usePathname();

    console.log(`pathname ${pathname}`);

    return (
        <header className={styles.section}>
            <Link href="/" className={styles.heading}>Билетопоиск</Link>
            <TotalCount />
        </header>
    )
}