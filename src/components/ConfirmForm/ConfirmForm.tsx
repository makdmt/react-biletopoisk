'use client'

import React, { FC } from "react";

import { useDispatch, useSelector } from "react-redux/es/exports";
import { selectItemAmount } from "@/redux/features/cart/selector";
import { cartActions } from "@/redux/features/cart";

import styles from './ConfirmForm.module.css'

interface IConfirmForm {
    heading: string,
    ask: string,
    yesBtnLabel?: string,
    yesBtnFunc: (evt: any) => void,
    noBtnLabel?: string,
    noBtnFunc: (evt: any) => void,
    extraClass?: string
}



export const ConfirmForm: FC<IConfirmForm> = ({ heading, ask, yesBtnLabel = 'Да', yesBtnFunc, noBtnLabel = 'Нет', noBtnFunc, extraClass }) => {

    return (
        <div className={`${styles.section} ${extraClass}`}>
            <h2 className={styles.heading}>{heading}</h2>
            <p className={styles.ask}>{ask}</p>
            <div className={styles.buttonContainer}>
                <button className={`${styles.button} ${styles.yesButton}`} onClick={yesBtnFunc}>{yesBtnLabel}</button>
                <button className={`${styles.button} ${styles.noButton}`} onClick={noBtnFunc}>{noBtnLabel}</button>
            </div>
        </div>
    )
}