import React, { FC, ReactElement } from "react";
import ReactDOM from 'react-dom'

import styles from './DropElement.module.css'


interface IDropElement {
    top: number,
    left: number,
    width: number,
    isRenderInRoot?: boolean,
    children: ReactElement
}


export const DropElement: FC<IDropElement> = ({ top, left, width, isRenderInRoot = false, children }) => {

    const rootHtml = document.getElementById('root') as HTMLElement;

    if (isRenderInRoot) return ReactDOM.createPortal((
        <div className={styles.drop} style={{ top, left, width, position: 'fixed' }}>
            {children}
        </div>
    ), rootHtml)


    return (
        <div className={styles.drop} style={{ top, left, width }}>
            {children}
        </div>
    )
}