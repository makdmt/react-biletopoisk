
import React, { FC } from "react";
import Link from "next/link";

import styles from './Footer.module.css'

export const Footer: FC= () => {

    return (
        <footer className={styles.section}>
            <Link href="/qna" className={styles.links}>Вопросы-ответы</Link>
            <Link href="/about-us" className={styles.links}>О нас</Link>
        </footer>
    )
}