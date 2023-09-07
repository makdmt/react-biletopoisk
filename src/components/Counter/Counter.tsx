'use client'

import React, { FC } from "react";

import { useDispatch, useSelector } from "react-redux/es/exports";
import { selectItemAmount } from "@/redux/features/cart/selector";
import { cartActions } from "@/redux/features/cart";

import styles from './Counter.module.css'

interface ICounter {
    filmId: string,
    openModalFunc?: (state: boolean) => void
}

export const Counter: FC<ICounter> = ({ filmId, openModalFunc }) => {

    const amount = useSelector((state) => selectItemAmount(state, filmId));
    const dispatch = useDispatch();

    const incrementHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.stopPropagation();
        dispatch(cartActions.increment(filmId));
    }

    const decrementHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.stopPropagation();
        !!openModalFunc
            ? amount > 1
                ? dispatch(cartActions.decrement(filmId))
                : openModalFunc(true)
            : dispatch(cartActions.decrement(filmId))

    }

    return (
        <div className={styles.section}>
            <button className={styles.button} onClick={incrementHandler}>+</button>
            <span className={styles.amountNumber}>{amount}</span>
            <button className={styles.button} onClick={decrementHandler}>-</button>
        </div>
    )
}