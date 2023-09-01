'use client'

import React, { FC } from "react";

import { useDispatch, useSelector } from "react-redux/es/exports";
import { selectCartModule } from "@/redux/features/cart/selector";

import { CartIcon } from "../Icons/CartIcon";

import Link from "next/link";

import styles from './TotalCount.module.css'

export const TotalCount: FC = () => {

    const cart = useSelector((state) => selectCartModule(state));

    let total = 0;

    for (const item in cart) {
        total += cart[item];
    }

    return (
        <Link href="/cart" className={styles.cartElement}>
            <p className={styles.squareBack}>{total}</p>
            <CartIcon />
        </Link>
    )
}