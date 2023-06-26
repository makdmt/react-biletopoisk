'use client'

import React, { FC } from "react";
import { usePathname } from 'next/navigation'
import Link from "next/link";

import styles from './Footer.module.css'

export const Footer: FC= () => {

    const pathname = usePathname();

    console.log(`pathname ${pathname}`);

    return (
        <footer className={styles.section}>
            <Link href="/qna" className={styles.links}>Вопросы-ответы</Link>
            <Link href="/about-us" className={styles.links}>О нас</Link>
        </footer>
    )
}