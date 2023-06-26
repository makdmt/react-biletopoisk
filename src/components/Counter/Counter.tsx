'use client'

import React, { FC } from "react";

import { useDispatch, useSelector } from "react-redux/es/exports";
import { selectItemAmount } from "@/redux/features/cart/selector";
import { cartActions } from "@/redux/features/cart";

import styles from './Counter.module.css'

interface ICounter {
    filmId: string,
    extraDecrementHandler?: (evt: React.MouseEvent<HTMLButtonElement>) => void
}

export const Counter: FC<ICounter> = ({ filmId, extraDecrementHandler }) => {

    const amount = useSelector((state) => selectItemAmount(state, filmId));
    const dispatch = useDispatch();

    const incrementHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.stopPropagation();
        dispatch(cartActions.increment(filmId));
    }

    const decrementHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.stopPropagation();
        dispatch(cartActions.decrement(filmId));
    }

    return (
        <div className={styles.section}>
            <button className={styles.button} onClick={incrementHandler}>+</button>
            <span className={styles.amountNumber}>{amount}</span>
            <button className={styles.button} onClick={extraDecrementHandler ? extraDecrementHandler : decrementHandler}>-</button>
        </div>
    )
}