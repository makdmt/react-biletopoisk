'use client'

import React, { FC } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectCartModule } from "@/redux/features/cart/selector";

import { CartIcon } from "../Icons/CartIcon";

import Link from "next/link";

import styles from './TotalCount.module.css'
import { usePathname } from 'next/navigation'

export const TotalCount: FC = () => {

    const pathname = usePathname();

    const cart = useSelector((state) => selectCartModule(state));

    let total = 0;

    for (const item in cart) {
        total += cart[item];
    }

    return (
        <Link href="/cart" className={`${styles.cartElement} ${pathname === '/cart' ? styles.cartElement_active : ''}`}>
            <p className={styles.squareBack}>{total}</p>
            <CartIcon />
        </Link>
    )
}