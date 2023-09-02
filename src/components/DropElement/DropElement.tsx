'use client'

import React, { FC, ReactElement, useState, ReactPortal, MouseEventHandler, MutableRefObject } from "react";
import ReactDOM from 'react-dom'

import styles from './DropElement.module.css'


interface IDropElement {
    reff: HTMLElement,
    children: ReactElement
}


export const DropElement: FC<IDropElement> = ({ reff, children }) => {

    let sizes = reff.getBoundingClientRect()
    let top = sizes.bottom;
    let left = sizes.left;


    const rootHtml = document.getElementById('root') as HTMLElement;

    return ReactDOM.createPortal((
        <div className={styles.drop} style={{ width: sizes.width, top: top, left: left }}>
            {children}
        </div>
    ), rootHtml)
}