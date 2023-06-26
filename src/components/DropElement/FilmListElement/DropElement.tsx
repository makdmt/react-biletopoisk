'use client'

import React, { FC, ReactElement, useState, ReactPortal } from "react";
import ReactDOM from 'react-dom'

import styles from './DropElement.module.css'

export const DropElement = ({ reff, children }: { children: ReactElement, reff: HTMLElement }) => {

    let sizes = reff.getBoundingClientRect()
    let top = sizes.height;
    let left = 0;

    return ReactDOM.createPortal((
        <div className={styles.drop} style={{ width: sizes.width, top: top, left: left }}>
            {children}
        </div>
    ), reff)
}